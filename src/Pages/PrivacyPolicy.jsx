import React from "react";
import { Link } from "react-router";


export default function PrivacyPolicy() {
    document.title = "Privacy & Policy"
    return (
        <div className="max-w-4xl mx-auto my-20 p-6 bg-white rounded-2xl shadow-md">
            <header className="mb-4">
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last updated: September 12, 2025</p>
            </header>


            <section className="space-y-4 text-gray-700">
                <article>
                    <h2 className="text-lg font-semibold">1. Information We Collect</h2>
                    <ul className="list-disc pl-6">
                        <li>Account information (name, email).</li>
                        <li>Usage data (logs, pages visited, device info).</li>
                        <li>Cookies and tracking technologies.</li>
                    </ul>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">2. How We Use Data</h2>
                    <p>We use collected data to operate and improve the service, personalize the experience, communicate with users, and for security and fraud prevention.</p>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">3. Sharing & Third Parties</h2>
                    <p>We do not sell personal data. We share data with service providers who help operate the service, and when required by law.</p>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">4. Your Choices</h2>
                    <p>You can access, correct, or delete your personal data by contacting support. You can control cookies via your browser settings.</p>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">5. Security</h2>
                    <p>We take reasonable measures to protect data, but no method of transmission or storage is 100% secure.</p>
                </article>


                <footer className="mt-6 text-sm text-gray-500">
                    <p>For privacy requests, email <Link href="mailto:privacy@example.com" className="underline">privacy@roomx.com</Link>.</p>
                </footer>
            </section>
        </div>
    );
}