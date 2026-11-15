import { Save, RotateCcw } from "lucide-react";

const PersonForm = ({ methods, onFormReset, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="hidden" {...register("id")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName", {
                required: "First Name is required",
                maxLength: { value: 30, message: "Max 30 characters" },
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName", {
                required: "Last Name is required",
                maxLength: { value: 30, message: "Max 30 characters" },
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>

          <button
            type="button"
            onClick={onFormReset}
            className="flex items-center justify-center px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
