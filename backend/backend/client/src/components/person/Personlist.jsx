import { Edit, Trash2 } from "lucide-react";

const PersonList = ({ peopleList, onPersonEdit, onPersonDelete }) => {
  if (!peopleList || peopleList.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
        <p className="text-gray-500 text-lg font-medium">No people found</p>
        <p className="text-gray-400 text-sm mt-1">
          Add some people using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {peopleList.map((person) => (
              <tr
                key={person.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {person.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {person.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onPersonEdit(person)}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 cursor-pointer"
                      title="Edit person"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>

                    <button
                      onClick={() => onPersonDelete(person)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200 cursor-pointer"
                      title="Delete person"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonList;
