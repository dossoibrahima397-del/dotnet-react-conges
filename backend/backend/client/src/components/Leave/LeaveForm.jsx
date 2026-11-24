import { Save, RotateCcw } from "lucide-react";

const LeaveForm = ({ methods, onFormSubmit, onFormReset }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="hidden" {...register("id")} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom & Prénom de l'employé*
          </label>
          <input
            type="text"
            {...register("employeeName", { required: true, maxLength: 60 })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Ex: Kouassi Jean"
          />
          {errors.employeeName?.type === "required" && (
            <p className="mt-1 text-sm text-red-600">Le nom est obligatoire</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de départ (Congé)*
            </label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.startDate?.type === "required" && (
              <p className="mt-1 text-sm text-red-600">La date de départ est obligatoire</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de retour*
            </label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.endDate?.type === "required" && (
              <p className="mt-1 text-sm text-red-600">La date de retour est obligatoire</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motif de la demande
          </label>
          <input
            type="text"
            {...register("reason", { maxLength: 200 })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Ex: Congé annuel, permission..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            type="button"
            onClick={onFormReset}
            className="flex items-center justify-center px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition duration-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
