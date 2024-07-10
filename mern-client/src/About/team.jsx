import React from 'react';
import proPic from '../assets/profile.jpg'
import proPic2 from '../assets/ai.webp'
import proPic3 from '../assets/aiman.jpg'
import proPic4 from '../assets/aigirl.webp'

const Team = () => {
  const teamMembers = [
    { name: 'Emma Swift', position: 'CEO', imageUrl: proPic },
    { name: 'Jane Smith', position: 'CTO', imageUrl: proPic3},
    { name: 'Ari Johnson', position: 'CFO', imageUrl:proPic4},
    { name: 'Emily Davis', position: 'COO', imageUrl: proPic2},
  ];

  return (
    <div className="text-center p-8 bg-teal-100 py-20">
      <h2 className="text-5xl font-bold mb-8 ">MEET OUR TEAM</h2>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="m-4 text-center">
            <img
              src={member.imageUrl}
              alt={`${member.name}`}
              className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover mx-auto"
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
