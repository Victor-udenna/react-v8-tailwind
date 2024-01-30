import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPet);
    // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);


  if (results.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="animate-spin text-4xl">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className=" relative details rounded-md bg-white p-4 shadow-md">
      <Carousel images={pet.images} />

      <div className="mt-4">
        <h1 className="mb-2 text-2xl font-bold">{pet.name}</h1>
        <h2 className="mb-4 text-gray-600">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p className="mt-4">{pet.description}</p>

        {showModal ? (
          <Modal>
            <div className="text-center bg-white p-10 rounded-md">
              <h1 className="mb-4 text-2xl font-bold">
                Would you like to adopt {pet.name}?
              </h1>
              <div className="flex justify-center space-x-4">
                <button
                  className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
