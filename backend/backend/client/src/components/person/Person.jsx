import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";

const Person = () => {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL + "/people";

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  const defaultFormValues = {
    id: 0,
    firstName: "",
    lastName: "",
  };

  const methods = useForm({
    defaultValues: defaultFormValues,
  });

  // Charger toutes les personnes au démarrage
  useEffect(() => {
    const loadPeople = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setPeople(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error loading data!");
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, [BASE_URL]);

  // Pré-remplir le formulaire lors d'un clic sur Edit
  useEffect(() => {
    if (editData) {
      methods.reset(editData);
    }
  }, [editData, methods]);

  // Réinitialiser le formulaire
  const handleFormReset = () => {
    methods.reset(defaultFormValues);
    setEditData(null);
  };

  // Ajouter ou modifier une personne
  const handleFormSubmit = async (person) => {
    setLoading(true);
    try {
      if (person.id <= 0) {
        // Ajout (POST)
        const response = await axios.post(BASE_URL, person);
        setPeople((prevPeople) => [...prevPeople, response.data]);
        toast.success("Saved successfully!");
      } else {
        // Modification (PUT)
        await axios.put(`${BASE_URL}/${person.id}`, person);
        setPeople((prevPeople) =>
          prevPeople.map((p) => (p.id === person.id ? person : p))
        );
        toast.success("Updated successfully!");
      }
      handleFormReset();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed!");
    } finally {
      setLoading(false);
    }
  };

  // Sélectionner une personne à modifier
  const handlePersonEdit = (person) => {
    setEditData(person);
  };

  // Supprimer une personne (DELETE)
  const handlePersonDelete = async (person) => {
    if (
      !window.confirm(
        `Are you sure to delete : ${person.firstName} ${person.lastName}?`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${person.id}`);
      setPeople((prevPeople) => prevPeople.filter((p) => p.id !== person.id));
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Person Management
          </h1>
          {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
        </div>

        <PersonForm
          methods={methods}
          onFormReset={handleFormReset}
          onFormSubmit={handleFormSubmit}
        />

        <PersonList
          peopleList={people}
          onPersonEdit={handlePersonEdit}
          onPersonDelete={handlePersonDelete}
        />
      </div>
    </div>
  );
};

export default Person;
