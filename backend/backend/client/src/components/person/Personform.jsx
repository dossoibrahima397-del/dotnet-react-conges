import { Save, RotateCcw } from "lucide-react";

const PersonForm = ({ methods, onFormSubmit, onFormReset }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      style={{ marginBottom: "5px" }}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="hidden" {...register("id")} />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name*
            </label>
            <input
              type="text"
              {...register("firstName", {
                required: true,
                maxLength: 30,
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter first name"
            />
            {errors.firstName?.type === "required" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                FirstName is required
              </p>
            )}
            {errors.firstName?.type === "maxLength" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                FirstName can not exceed 30 characters
              </p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name*
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: true,
                maxLength: 30,
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter last name"
            />
            {errors.lastName?.type === "required" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                LastName is required
              </p>
            )}
            {errors.lastName?.type === "maxLength" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                LastName can not exceed 30 characters
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            type="button"
            onClick={onFormReset}
            className="flex items-center justify-center px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 cursor-pointer"
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
