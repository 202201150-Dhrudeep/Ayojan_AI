import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Ceremony = () => {
  const { projectId } = useParams(); // Assuming URL like /ceremony/:projectId
  const [ceremonies, setCeremonies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCeremonies = async () => {
      try {
        const res = await fetch(`/api/ceremonies?projectId=${projectId}`, {
          method: 'GET',
          credentials: 'include', // Sends cookie token
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setCeremonies(data.ceremonies || []);
      } catch (err) {
        console.error('Error fetching ceremonies:', err);
        setCeremonies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCeremonies();
  }, [projectId]);

  if (loading) {
    return (
      <div className="text-center text-pink-600 mt-10 text-lg">
        Loading ceremonies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
        Ceremonies
      </h1>

      {ceremonies.length === 0 ? (
        <p className="text-center text-gray-600">No ceremonies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ceremonies.map((ceremony, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
            >
              {ceremony.image && (
                <img
                  src={ceremony.image}
                  alt={ceremony.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-pink-700 mb-2">
                {ceremony.name}
              </h2>
              <p className="text-gray-600 text-sm">{ceremony.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ceremony;
