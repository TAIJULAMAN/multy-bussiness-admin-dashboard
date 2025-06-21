import PageHeading from "../../Components/Shared/PageHeading";

export default function DocumentPage() {
          return (
                    <div className="p-5">
                              <div className="bg-white">
                                        {/* Header */}
                                        <div className="flex items-center p-5">
                                                  <PageHeading title="Arlene McCoy NDA" />
                                        </div>

                                        {/* Document Content */}
                                        <div className="p-8 space-y-6">
                                                  {/* Title Section */}
                                                  <div className="text-center space-y-2">
                                                            <h1 className="text-2xl font-bold text-gray-900">Seller Non-Disclosure Agreement (NDA)</h1>
                                                            <p className="text-lg text-gray-700 font-medium">ProfitableBusinessesForSale.com</p>
                                                            <p className="text-sm text-gray-600 italic">From Listings To Legacy</p>
                                                  </div>

                                                  {/* Main Content */}
                                                  <div className="space-y-6">
                                                            {/* Introduction */}
                                                            <div>
                                                                      <h2 className="text-lg font-bold text-gray-900 mb-3">— Seller Non-Disclosure Agreement</h2>
                                                                      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                                                                                <p>This Non-Disclosure Agreement ("Agreement") is entered into by and between:</p>
                                                                                <p>
                                                                                          <strong>First Party (Disclosing Party):</strong> The Seller, an individual or entity listing a
                                                                                          business for sale on ProfitableBusinessesForSale.com ("Disclosing Party").
                                                                                </p>
                                                                                <p>
                                                                                          <strong>Second Party (Receiving Party):</strong> ProfitableBusinessesForSale.com, operated by Global
                                                                                          IPQ LLC under license no. 2430223.01 ("Receiving Party").
                                                                                </p>
                                                                                <p>
                                                                                          By submitting a business listing, uploading sensitive materials, or sharing confidential details with
                                                                                          ProfitableBusinessesForSale.com, the Seller agrees to the following terms:
                                                                                </p>
                                                                      </div>
                                                            </div>

                                                            {/* Section 1 */}
                                                            <div>
                                                                      <h3 className="text-base font-bold text-gray-900 mb-3">1. Purpose</h3>
                                                                      <p className="text-sm text-gray-700 leading-relaxed">
                                                                                This Agreement ensures that any confidential business information shared with
                                                                                ProfitableBusinessesForSale.com for the purpose of promoting, evaluating, and listing the Seller's
                                                                                business for sale remains protected and undisclosed to unauthorized parties.
                                                                      </p>
                                                            </div>

                                                            {/* Section 2 */}
                                                            <div>
                                                                      <h3 className="text-base font-bold text-gray-900 mb-3">2. Definition of Confidential Information</h3>
                                                                      <p className="text-sm text-gray-700 mb-3">"Confidential Information" includes but is not limited to:</p>
                                                                      <ul className="text-sm text-gray-700 space-y-1 ml-6">
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Financial statements, tax returns, and profit/loss summaries</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Business registration details</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Customer and vendor lists</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Contracts, licenses, or proprietary agreements</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Operational details and internal processes</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Marketing and strategic plans</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Employee records and payroll summaries</span>
                                                                                </li>
                                                                      </ul>
                                                                      <p className="text-sm text-gray-700 mt-3">
                                                                                All Confidential Information remains the property of the Disclosing Party.
                                                                      </p>
                                                            </div>

                                                            {/* Section 3 */}
                                                            <div>
                                                                      <h3 className="text-base font-bold text-gray-900 mb-3">
                                                                                3. Obligations of ProfitableBusinessesForSale.com
                                                                      </h3>
                                                                      <p className="text-sm text-gray-700 mb-3">ProfitableBusinessesForSale.com agrees to:</p>
                                                                      <ul className="text-sm text-gray-700 space-y-1 ml-6">
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Use the information solely for evaluating and facilitating the business sale</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>Not disclose or share confidential data with third parties without written permission</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                          <span className="mr-2">•</span>
                                                                                          <span>
                                                                                                    Protect confidential information with the same degree of care used for its own confidential
                                                                                                    information
                                                                                          </span>
                                                                                </li>
                                                                      </ul>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
