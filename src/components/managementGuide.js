import React from "react"
import HashLoader from "react-spinners/HashLoader"

export default function ManagementGuide({
  resMngGuide,
  managementGuide,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div>
        <HashLoader size={70} color={"#1987C2"} loading={isLoading} />
      </div>
    )
  }

  if (!resMngGuide) {
    return null
  }

  return (
    <div>
      <h2 className="mb-3 font-semibold text-gray-600 md:text-2xl">
        Management Guide
      </h2>
      <p className="text-sm bg-white px-4 py-6 rounded">
        <span className="font-semibold">Explanation:</span>{" "}
        {managementGuide.explanation}
      </p>
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-secondary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Pest Status
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-secondary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Pest Management
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 w-1/2 text-gray-700">
                    {resMngGuide.pestStatus}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 w-1/2 text-gray-700">
                    {resMngGuide.pestManagement}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
