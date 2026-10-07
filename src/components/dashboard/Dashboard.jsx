import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Repository request failed (${response.status})`);
        }
        const data = await response.json();
        setRepositories(data.repositories ?? data.repository ?? []);
      } catch (e) {
        console.error("Error while fetching repositories:", e);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        if (!response.ok) {
          throw new Error(`Suggested repository request failed (${response.status})`);
        }
        const data = await response.json();
        setSuggestedRepositories(data.repositories ?? data.repository ?? []);
      } catch (e) {
        console.error("Error while fetching suggested repositories:", e);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  const filteredRepositories = useMemo(
    () =>
      repositories.filter((repo) =>
        repo.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [repositories, searchQuery],
  );

  return (
    <>
      <Navbar />
      <section>
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => (
            <div key={repo._id}>
              <h4>{repo.name}</h4>
              <p>{repo.description}</p>
            </div>
          ))}
        </aside>
        <main>
          <h3>Your Repositories</h3>
          <div id="search">
            <input
              type="search"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredRepositories.map((repo) => (
            <div key={repo._id}>
              <h4>{repo.name}</h4>
              <p>{repo.description}</p>
            </div>
          ))}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 2026</p>
            </li>
            <li>
              <p>Developer Meeting - Jan 2026</p>
            </li>
            <li>
              <p>React Submit - Feb 2026</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
