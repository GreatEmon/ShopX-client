import React from "react";
import { Link } from "react-router";


export default function TermsOfService() {
    document.title = "Terms"
    return (
        <div className="max-w-4xl mx-auto my-20 p-6 bg-white rounded-2xl shadow-md">
            <header className="mb-4">
                <h1 className="text-2xl font-bold">Terms of Service</h1>
                <p className="text-sm text-gray-500">Last updated: September 12, 2025</p>
            </header>


            <section className="space-y-4">
                <article>
                    <h2 className="text-lg font-semibold">1. Acceptance</h2>
                    <p className="text-gray-700">By accessing or using this service, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">2. Use of Service</h2>
                    <p className="text-gray-700">You may use the service only in compliance with these terms and applicable laws. You must not misuse the service or attempt to gain unauthorized access to it.</p>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">3. Content</h2>
                    <p className="text-gray-700">Users retain ownership of user-provided content. By submitting content you grant the service a license to host and display it as necessary to provide the service.</p>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">4. Termination</h2>
                    <p className="text-gray-700">We may suspend or terminate access for violations of these terms or for any reason, with or without notice.</p>
                </article>


                <article>
                    <h2 className="text-lg font-semibold">5. Limitation of Liability</h2>
                    <p className="text-gray-700">To the maximum extent permitted by law, the service is provided "as is" and we are not liable for indirect, incidental, or consequential damages.</p>
                </article>


                <footer className="mt-6 text-sm text-gray-500">
                    <p>Questions? Contact us at <Link href="mailto:support@example.com" className="underline">support@roomx.com</Link>.</p>
                </footer>
            </section>
        </div>
    );
}