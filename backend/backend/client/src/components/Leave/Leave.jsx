import { useEffect, useState } from "react";
import LeaveForm from "./LeaveForm";
import LeaveList from "./LeaveList";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

function Leave() {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL + "/leaverequests";

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  const defaultFormValues = {
    id: 0,
    employeeName: "",
    startDate: "",
    endDate: "",
    reason: "",
  };

  const methods = useForm({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const data = (await axios.get(BASE_URL)).data;
        setLeaves(data);
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors du chargement des congés");
      } finally {
        setLoading(false);
      }
    };

    loadLeaves();
  }, []);

  useEffect(() => {
    if (editData) {
      methods.reset(editData);
    }
  }, [editData]);

  const handleFormReset = () => {
    methods.reset(defaultFormValues);
    setEditData(null);
  };

  const handleFormSubmit = async (leave) => {
    setLoading(true);
    try {
      if (leave.id <= 0) {
        const createdLeave = (await axios.post(BASE_URL, leave)).data;
        setLeaves((prev) => [...prev, createdLeave]);
      } else {
        await axios.put(`${BASE_URL}/${leave.id}`, leave);
        setLeaves((prev) =>
          prev.map((l) => (l.id === leave.id ? leave : l))
        );
      }
      methods.reset(defaultFormValues);
      setEditData(null);
      toast.success("Demande enregistrée !");
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveEdit = (leave) => {
    setEditData(leave);
  };

  const handleLeaveDelete = async (leave) => {
    if (!confirm(`Supprimer le congé de ${leave.employeeName} ?`)) {
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${leave.id}`);
      setLeaves((prev) => prev.filter((l) => l.id !== leave.id));
      toast.success("Supprimé avec succès !");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Demande de Congés
          </h1>
          {loading && <p>Loading...</p>}
        </div>

        <LeaveForm
          methods={methods}
          onFormSubmit={handleFormSubmit}
          onFormReset={handleFormReset}
        />

        <LeaveList
          leaveList={leaves}
          onLeaveEdit={handleLeaveEdit}
          onLeaveDelete={handleLeaveDelete}
        />
      </div>
    </div>
  );
}

export default Leave;
