import { Edit, Trash2 } from "lucide-react";

const LeaveList = ({ leaveList, onLeaveEdit, onLeaveDelete }) => {
  if (!leaveList || leaveList.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-medium">Aucune demande de congé</p>
        <p className="text-sm mt-1">Utilisez le formulaire ci-dessus pour faire une demande.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Employé</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Départ</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Retour</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Motif</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaveList.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {leave.employeeName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {leave.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {leave.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {leave.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="inline-flex space-x-2">
                    <button
                      onClick={() => onLeaveEdit(leave)}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => onLeaveDelete(leave)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition cursor-pointer"
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

export default LeaveList;
