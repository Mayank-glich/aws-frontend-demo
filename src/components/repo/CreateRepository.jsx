import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, PageHeader } from "@primer/react";
import Navbar from "../../Navbar";
import "./createRepository.css";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3002/repo/create", {
        name,
        description,
        visibility,
        owner: localStorage.getItem("userId"),
      });

      if (response.status !== 201) {
        throw new Error("The repository could not be created.");
      }

      navigate("/repo");
    } catch (requestError) {
      console.error("Error creating repository:", requestError);
      setError(
        requestError.response?.data?.error ??
          requestError.message ??
          "The repository could not be created.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="create-repository">
        <PageHeader>
          <PageHeader.TitleArea variant="large">
            <PageHeader.Title>Create a repository</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
        <form onSubmit={handleSubmit}>
          <label htmlFor="repository-name">Repository name</label>
          <input
            id="repository-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="repository-description">Description</label>
          <textarea
            id="repository-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label className="repository-visibility">
            <input
              type="checkbox"
              checked={visibility}
              onChange={(event) => setVisibility(event.target.checked)}
            />
            Public repository
          </label>
          {error && <p role="alert">{error}</p>}
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Creating..." : "Create repository"}
          </Button>
        </form>
      </main>
    </>
  );
};

export default CreateRepository;
