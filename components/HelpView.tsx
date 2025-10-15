import React from 'react';
import { HelpIcon, MenuIcon } from './icons/Icons';

interface FAQItemProps {
    question: string;
    children: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => {
    return (
        <details className="p-4 rounded-lg bg-light-primary dark:bg-dark-secondary cursor-pointer transition-all duration-300 open:shadow-lg">
            <summary className="font-semibold text-gray-800 dark:text-gray-100 list-none flex justify-between items-center">
                {question}
                <span className="text-med-blue dark:text-med-green transform transition-transform duration-300 details-arrow">&#9656;</span>
            </summary>
            <div className="mt-3 pt-3 border-t border-light-tertiary dark:border-dark-tertiary text-gray-600 dark:text-gray-400 space-y-2">
                {children}
            </div>
        </details>
    );
};

interface HelpViewProps {
    toggleSidebar: () => void;
}

const HelpView: React.FC<HelpViewProps> = ({ toggleSidebar }) => {
    return (
        <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
            <style>{`
                details > summary::-webkit-details-marker { display: none; }
                details[open] .details-arrow { transform: rotate(90deg); }
            `}</style>
            <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm flex items-center">
                <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
                    <MenuIcon />
                </button>
                <h2 className="text-xl font-semibold">Help & FAQ</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                <div className="bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6">
                    <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">A Guide to HIPAA Compliance</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                        This guide summarizes key principles from the HHS.gov OCR's "Summary of the HIPAA Privacy Rule" to help health professionals understand their compliance responsibilities when using digital health tools like MyMedic.
                    </p>
                    
                    <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm">
                        <div>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">1. Protected Health Information (PHI)</h4>
                            <p>PHI is any identifiable health information related to an individual's health status, provision of health care, or payment for health care. This includes names, medical records, and insurance details. MyMedic's architecture is designed to treat all data in the Patient Portal as sensitive PHI, ensuring it is handled with the highest level of security.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">2. The "Minimum Necessary" Rule</h4>
                            <p>The Privacy Rule requires covered entities to make reasonable efforts to limit the use or disclosure of PHI to the minimum necessary to accomplish the intended purpose. MyMedic demonstrates this by providing summarized information where appropriate, with more detailed views requiring specific user action.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">3. Permitted Uses and Disclosures</h4>
                            <p>PHI can be used and disclosed for treatment, payment, and health care operations without a patient's explicit authorization. Any other disclosure requires patient consent. MyMedic's features, like the Interaction Checker, are designed to support treatment purposes while ensuring data is not shared externally without authorization.</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">4. Patient Rights and Access</h4>
                            <p>HIPAA grants patients the right to access and review their own PHI. The "Patient Account" portal is a direct reflection of this right, providing a transparent and comprehensive view of their (mock) health information.</p>
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-light-tertiary dark:bg-dark-tertiary">
                             <p className="font-semibold text-gray-800 dark:text-gray-200">Our Commitment in Practice:</p>
                             <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong>Data Security:</strong> In a production environment, all data would be encrypted both in transit and at rest.</li>
                                <li><strong>Access Controls:</strong> User authentication and role-based permissions would ensure only authorized personnel can access PHI.</li>
                                <li><strong>Privacy by Design:</strong> MyMedic is built with the principle of safeguarding patient data at every step. While this is a demo with mock data, it serves as a blueprint for a secure, HIPAA-compliant application.</li>
                             </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-4">
                     <div className="inline-block p-4 bg-light-primary dark:bg-dark-secondary rounded-full mb-4">
                        <HelpIcon className="w-10 h-10 text-med-blue dark:text-med-green" />
                    </div>
                    <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
                    <p className="text-gray-500 dark:text-gray-400">Find answers to common questions about MyMedic.</p>
                </div>
                
                <div className="space-y-4">
                    <FAQItem question="What is MyMedic?">
                        <p>MyMedic is an AI-powered assistant designed to provide information about medications, drug interactions, and health conditions. It is intended for educational purposes only.</p>
                    </FAQItem>

                    <FAQItem question="Is MyMedic a substitute for a doctor?">
                        <p><strong>No.</strong> MyMedic is not a medical professional and cannot provide diagnoses, prescriptions, or medical advice. All information should be considered educational. Always consult with a qualified healthcare provider for any health concerns or before making any decisions related to your health or treatment.</p>
                    </FAQItem>
                    
                    <FAQItem question="How do I check for drug interactions?">
                        <p>Navigate to the "Interaction Checker" from the sidebar. Use the "Add Medication" button to select two or more drugs you wish to check. The results will display automatically, highlighting any potential interactions and their severity.</p>
                    </FAQItem>

                    <FAQItem question="How does the Medication Comparison tool work?">
                        <p>In the "Compare" view, you can add up to three medications to see a side-by-side comparison of their key features, such as drug class, uses, common side effects, and more. This can help you understand the differences between various treatment options, but should not be used to make treatment decisions without consulting a doctor.</p>
                    </FAQItem>

                    <FAQItem question="Is my data safe?">
                        <p>This is a demo application. The patient data shown in the "Patient Account" view is entirely fictional and for demonstration purposes only. No real user data is collected, stored, or transmitted in this version.</p>
                    </FAQItem>
                    <FAQItem question="How do I switch between light and dark mode?">
                        <p>At the bottom of the sidebar, there is a toggle button that allows you to switch between light and dark themes for your comfort.</p>
                    </FAQItem>
                </div>
            </div>
        </div>
    );
};

export default HelpView;