import { InteractionResult } from '../types';
import { medications } from './medications';

type InteractionDetail = {
    severity: 'Critical' | 'Moderate' | 'Minor';
    summary: string;
    details: string;
};

type InteractionMap = {
    [key: string]: {
        [key: string]: InteractionDetail
    }
};

const rawInteractionCsv = `Drug1,Drug2,Effect,Mechanism,Recommendations,Source
Amiodarone (Cordarone®),Ciprofloxacin (Cipro®),Increased risk of TdP and/or QTc prolongation on ECG,Concomitant blockade of cardiac potassium channels,"Usually Avoid. Consider Alternatives: Alternative antimicrobials include penicillins, and cephalosporins. See www.azcert.org for QT drug lists by risk group",Crediblemeds
Carbamazepine (Tegretol®),Clarithromycin (Biaxin®),Increased carbamazepine concentrations and risk of carbamazepine toxicity,Inhibition of carbamazepine metabolism by CYP3A4,"Take Precautions. Consider Alternatives: Consider alternative antimicrobials (e.g., azithromycin, quinolones, 2nd/3rd generation cephalosporins, penicillin).",Crediblemeds
Digoxin (Lanoxin®),Clarithromycin (Biaxin®),Increased digoxin concentrations and risk of digoxin toxicity,Inhibition of digoxin transport by P-glycoprotein,"Take Precautions. Consider alternative antimicrobials that do not inhibit P-glycoprotein (e.g., 2nd/3rd generation cephalosporins, penicillin, quinolones).",Crediblemeds
Simvastatin,Amiodarone (Cordarone®),Increased simvastatin/ lovastatin concentrations and risk of myopathy/ rhabdomyolysis,Inhibition of metabolism of simvastatin/ lovastatin by CYP3A4,"Usually Avoid. Consider Alternatives: Preferable statin alternatives include fluvastatin, rosuvastatin, or pravastatin. The simvastatin dose should not exceed 20 mg/day in combination with amiodarone.",Crediblemeds
Statins,Fluconazole (Diflucan®),Increased simvastatin/ lovastatin concentrations and risk of myopathy/ rhabdomyolysis,Inhibition of simvastatin/ lovastatin metabolism by CYP3A4,"Usually Avoid. Consider Alternative Antifungal Agents: Terbinafine. Temporarily holding the statin during short-term azole antifungal therapy is a reasonable alternative.",Crediblemeds
Tamoxifen (Nolvadex®),Bupropion (Wellbutrin®),Decreased clinical effectiveness of tamoxifen,Inhibition of activation of tamoxifen (prodrug) to its major active metabolite by CYP2D6,"Take Precautions. Consider Alternatives: Preferable antidepressant alternatives are citalopram, desvenlafaxine, escitalopram, sertraline, and venlafaxine.",Crediblemeds
Warfarin,Acetaminophen,"Increased bleeding, increased INR",Reduced capacity of cytochrome P450 enzymes,"Use lowest possible acetaminophen dosage and monitor INR.",AAFP
Warfarin,"Ciprofloxacin (Cipro), Clarithromycin (Biaxin), Erythromycin, Metronidazole (Flagyl), Trimethoprim-sulfamethoxazole (Bactrim, Septra)",Increased effect of warfarin,Inhibition of warfarin metabolism or intestinal flora,"Select alternative antibiotic. Monitor INR every other day if unavoidable.",AAFP
Warfarin (Coumadin®),Amiodarone (Cordarone®),Increased warfarin concentrations and bleeding risk,Inhibition of warfarin metabolism by CYP2C9,"Take Precautions. Monitor INR. The warfarin dosage may need to be reduced by 30%-50%.",Crediblemeds
Warfarin (Coumadin®),Fluconazole (Diflucan®),Increased warfarin concentrations and bleeding risk,Inhibition of warfarin metabolism by CYP2C9,"Usually Avoid. Consider Alternatives: Itraconazole, ketoconazole, posaconazole, and terbinafine are preferable alternatives.",Crediblemeds
Warfarin,NSAID,"Increased bleeding, increased INR",Antiplatelet effects and gastric mucosal damage,"Avoid concomitant use if possible; if necessary, use a cyclooxygenase-2 inhibitor and monitor INR.",AAFP
Bactrim (sulfamethoxazole/trimethoprim),Warfarin,Increases bleeding risk,Not specified,Not specified,GoodRx
Levothyroxine,Omeprazole,"Reduces levothyroxine absorption, making it less effective",Not specified,Levothyroxine is an NTI medication,GoodRx
Lithium,NSAID or diuretic,Increased lithium levels,Altered sodium balance at the kidney,"Decrease lithium dosage by 50% and monitor lithium levels.",AAFP
Oral contraceptive pills,Antibiotics,Decreased effectiveness of oral contraception,Interrupted enterohepatic circulation of estrogen,"Avoid if possible. Recommend use of alternative contraceptive method during cycle.",AAFP
Fluconazole,Simvastatin,"Increased blood levels of simvastatin, heightening side effects",Inhibition of CYP450 enzymes,Not specified,GoodRx`;

const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result.map(val => val.replace(/^"|"$/g, ''));
};

const cleanDrugName = (rawName: string): string[] => {
    return rawName.toLowerCase()
                  .replace(/®/g, '')
                  .replace(/™/g, '')
                  .split(/[\(\/]/)
                  .map(part => part.replace(')', '').trim())
                  .filter(Boolean);
};

const inferSeverity = (text: string): 'Critical' | 'Moderate' | 'Minor' => {
    const lowerText = text.toLowerCase();
    if (['usually avoid', 'tdr', 'torsades', 'fatal', 'rhabdomyolysis', 'lactic acidosis', 'angioedema', 'qtc prolongation', 'contraindicated'].some(kw => lowerText.includes(kw))) {
        return 'Critical';
    }
    if (['bleeding risk', 'monitor', 'take precautions', 'hypotension', 'toxicity', 'increased levels', 'increased effect', 'increased concentrations'].some(kw => lowerText.includes(kw))) {
        return 'Moderate';
    }
    return 'Minor';
};

const buildInteractionMap = (): InteractionMap => {
    const nameToIdMap: { [key: string]: string } = {};
    medications.forEach(med => {
        nameToIdMap[med.genericName.toLowerCase()] = med.id;
        med.brandNames.forEach(name => {
            nameToIdMap[name.toLowerCase()] = med.id;
        });
    });

    const interactionData: InteractionMap = {};
    const rows = rawInteractionCsv.split('\n').slice(1);

    rows.forEach(row => {
        const columns = parseCsvLine(row);
        if (columns.length < 5) return;
        
        const [drug1Raw, drug2Raw, effect, mechanism, recommendations] = columns;

        const drug1Names = cleanDrugName(drug1Raw);
        const drug2Names = cleanDrugName(drug2Raw);

        let id1: string | null = null;
        for (const name of drug1Names) {
            if (nameToIdMap[name]) {
                id1 = nameToIdMap[name];
                break;
            }
        }

        let id2: string | null = null;
        for (const name of drug2Names) {
            if (nameToIdMap[name]) {
                id2 = nameToIdMap[name];
                break;
            }
        }

        if (id1 && id2 && id1 !== id2) {
            const fullDescription = `${effect}. ${recommendations}`;
            const interaction: InteractionDetail = {
                severity: inferSeverity(fullDescription),
                summary: effect,
                details: `Mechanism: ${mechanism || 'Not specified'}. Recommendations: ${recommendations || 'Consult a healthcare professional.'}`
            };

            if (!interactionData[id1]) interactionData[id1] = {};
            interactionData[id1][id2] = interaction;

            if (!interactionData[id2]) interactionData[id2] = {};
            interactionData[id2][id1] = interaction;
        }
    });

    return interactionData;
};

const interactionData: InteractionMap = buildInteractionMap();

export const checkInteractions = (medicationIds: string[]): InteractionResult => {
    if (medicationIds.length < 2) {
        return {
            severity: 'None',
            summary: 'Add at least two medications to check for interactions.',
            details: []
        };
    }

    const interactionsFound: InteractionDetail[] = [];

    for (let i = 0; i < medicationIds.length; i++) {
        for (let j = i + 1; j < medicationIds.length; j++) {
            const med1Id = medicationIds[i];
            const med2Id = medicationIds[j];

            const interaction = interactionData[med1Id]?.[med2Id];
            if (interaction) {
                interactionsFound.push(interaction);
            }
        }
    }

    if (interactionsFound.length === 0) {
        return {
            severity: 'None',
            summary: 'No significant interactions were found between the selected medications.',
            details: ['This check is not a substitute for professional medical advice. Always consult your doctor or pharmacist.']
        };
    }

    const highestSeverity = interactionsFound.reduce((max, current) => {
        if (current.severity === 'Critical') return 'Critical';
        if (current.severity === 'Moderate' && max !== 'Critical') return 'Moderate';
        if (current.severity === 'Minor' && max !== 'Critical' && max !== 'Moderate') return 'Minor';
        return max;
    }, 'None' as InteractionResult['severity']);
    
    return {
        severity: highestSeverity,
        summary: `${interactionsFound.length} interaction(s) found. Highest severity: ${highestSeverity}.`,
        details: interactionsFound.map(inter => inter.details),
    };
};