import React from "react"
import model from "../assets/model-data.json"

export default function PestManagement() {
  return (
    <div>
      <h2 className="mb-3 font-semibold text-gray-600 md:text-2xl">
        Management
      </h2>
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Pest Status
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Pest Management
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 w-1/2 text-gray-700">
                    {model.pestManagement.pestStatus}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 w-1/2 text-gray-700">
                    {model.pestManagement.pestManagement}
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
