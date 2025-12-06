import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Users, Heart, Zap, Book, Shield, Sparkles } from 'lucide-react';

export default function CharacterForgeActivator() {
  const [stage, setStage] = useState("intro");
  const [characterType, setCharacterType] = useState(null);
  const [selectedRealms, setSelectedRealms] = useState([]);
  const [selectedForces, setSelectedForces] = useState([]);
  const [characterEssence, setCharacterEssence] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [character, setCharacter] = useState(null);
  
  const characterTypes = [
    { id: "wanderer", name: "The Wanderer", icon: "🌀" },
    { id: "guardian", name: "The Guardian", icon: "🛡️" },
    { id: "catalyst", name: "The Catalyst", icon: "⚡" },
    { id: "mystic", name: "The Mystic", icon: "✨" }
  ];
  
  const realms = [
    { id: "hacroth", name: "Hacroth's Heights" },
    { id: "jro", name: "Jro's Hidden Courts" },
    { id: "spirit", name: "Spirit Abyss" },
    { id: "dreams", name: "Realm of Dreams" },
    { id: "temporal", name: "Temporal Fractures" },
    { id: "mortal", name: "Mortal Domain" }
  ];
  
  const cosmicForces = [
    { id: "vaclond", name: "Vaclond's Lightning" },
    { id: "prothohar", name: "Prothohar's Ambition" },
    { id: "unseen", name: "The Unseen Third" },
    { id: "cosmic", name: "Cosmic Monster's Echo" }
  ];
  
  const toggleRealm = (id) => {
    if (selectedRealms.includes(id)) {
      setSelectedRealms(selectedRealms.filter(realm => realm !== id));
    } else {
      setSelectedRealms([...selectedRealms, id]);
    }
  };
  
  const toggleForce = (id) => {
    if (selectedForces.includes(id)) {
      setSelectedForces(selectedForces.filter(force => force !== id));
    } else {
      setSelectedForces([...selectedForces, id]);
    }
  };
  
  const generateCharacter = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newCharacter = {
        name: "Thorne Nightwhisper",
        type: characterTypes.find(t => t.id === characterType).name,
        realms: selectedRealms.map(id => realms.find(r => r.id === id).name),
        forces: selectedForces.map(id => cosmicForces.find(f => f.id === id).name),
        essence: characterEssence,
        description: "A mysterious figure who walks between worlds, marked by cosmic forces beyond mortal comprehension. Thorne's eyes reflect the vastness of Hacroth's Heights, while their movements carry the fluid grace of one who has navigated Jro's Hidden Courts. The echo of the Cosmic Monster reverberates in their words, giving them insights that few can comprehend.",
        abilities: ["Dimensional Sight", "Whispers of the Void", "Temporal Echoes"],
        challenges: ["Haunted by spectral visions", "Sought by agents of Prothohar", "Phasing unpredictably between realms"]
      };
      
      setCharacter(newCharacter);
      setIsGenerating(false);
      setStage("result");
    }, 2000);
  };
  
  const reset = () => {
    setStage("intro");
    setCharacterType(null);
    setSelectedRealms([]);
    setSelectedForces([]);
    setCharacterEssence("");
    setCharacter(null);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0D0D15] text-white rounded-xl overflow-hidden shadow-xl border border-[#331F4A]">
      <div 
        className="p-6 relative" 
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(90, 200, 250, 0.1), rgba(0, 0, 0, 0))',
        }}
      >
        {/* Dimensional Grid Background */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'linear-gradient(rgba(90, 200, 250, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90, 200, 250, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            perspectiveOrigin: 'center',
            transform: 'perspective(1000px) rotateX(30deg)',
            opacity: 0.15
          }}
        ></div>
        
        {/* Content */}
        <div className="relative z-10">
          {stage === "intro" && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-[#5AC8FA] mb-6">
                Character Forge: First Invocation
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                The veil between worlds thins as you approach the Spirit Fragment.
                Within its crystalline depths, formless entities await your call.
              </p>
              <button 
                onClick={() => setStage("creation")}
                className="px-8 py-3 bg-[#331F4A] hover:bg-[#6A3093] text-white rounded-lg transition-all shadow-lg hover:shadow-[0_0_15px_rgba(90,200,250,0.5)] border border-[#5AC8FA]"
              >
                Begin Invocation
              </button>
            </div>
          )}
          
          {stage === "creation" && (
            <div>
              <h2 className="text-2xl font-bold text-[#5AC8FA] mb-6">
                Character Forge: Essence Formation
              </h2>
              
              <div className="mb-6">
                <label className="block text-[#5AC8FA] mb-2">1. Choose a character archetype:</label>
                <div className="grid grid-cols-2 gap-4">
                  {characterTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setCharacterType(type.id)}
                      className={`flex items-center p-4 rounded-lg border transition-all ${
                        characterType === type.id 
                          ? 'border-[#BF4080] bg-[#BF4080] bg-opacity-20' 
                          : 'border-[#331F4A] hover:border-[#5AC8FA]'
                      }`}
                    >
                      <div className={`mr-3 ${characterType === type.id ? 'text-[#BF4080]' : 'text-[#5AC8FA]'}`}>
                        {type.icon}
                      </div>
                      <span>{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-[#5AC8FA] mb-2">2. Select the realms this entity has traversed:</label>
                <div className="grid grid-cols-2 gap-2">
                  {realms.map(realm => (
                    <label 
                      key={realm.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedRealms.includes(realm.id) 
                          ? 'border-[#BF4080] bg-[#BF4080] bg-opacity-20' 
                          : 'border-[#331F4A] hover:border-[#5AC8FA]'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedRealms.includes(realm.id)}
                        onChange={() => toggleRealm(realm.id)}
                      />
                      <div className={`w-5 h-5 mr-3 flex items-center justify-center rounded border ${
                        selectedRealms.includes(realm.id) 
                          ? 'border-[#BF4080] text-[#BF4080]' 
                          : 'border-[#5AC8FA]'
                      }`}>
                        {selectedRealms.includes(realm.id) && "✓"}
                      </div>
                      <span>{realm.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-[#5AC8FA] mb-2">3. Determine which cosmic forces have marked this entity:</label>
                <div className="grid grid-cols-2 gap-2">
                  {cosmicForces.map(force => (
                    <label 
                      key={force.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedForces.includes(force.id) 
                          ? 'border-[#BF4080] bg-[#BF4080] bg-opacity-20' 
                          : 'border-[#331F4A] hover:border-[#5AC8FA]'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedForces.includes(force.id)}
                        onChange={() => toggleForce(force.id)}
                      />
                      <div className={`w-5 h-5 mr-3 flex items-center justify-center rounded border ${
                        selectedForces.includes(force.id) 
                          ? 'border-[#BF4080] text-[#BF4080]' 
                          : 'border-[#5AC8FA]'
                      }`}>
                        {selectedForces.includes(force.id) && "✓"}
                      </div>
                      <span>{force.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-[#5AC8FA] mb-2">4. Define the entity's essential nature:</label>
                <textarea 
                  className="w-full p-3 bg-[#131A36] border border-[#331F4A] rounded-lg focus:border-[#5AC8FA] focus:outline-none"
                  rows="3"
                  placeholder="Describe the core essence of this character in a few words..."
                  value={characterEssence}
                  onChange={(e) => setCharacterEssence(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={generateCharacter}
                  disabled={!characterType || selectedRealms.length === 0 || selectedForces.length === 0 || !characterEssence}
                  className={`px-8 py-3 rounded-lg transition-all shadow-lg text-white ${
                    !characterType || selectedRealms.length === 0 || selectedForces.length === 0 || !characterEssence
                      ? 'bg-[#331F4A] opacity-50 cursor-not-allowed'
                      : 'bg-[#BF4080] hover:bg-[#d84d92] hover:shadow-[0_0_15px_rgba(191,64,128,0.5)]'
                  }`}
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Invoking Entity...
                    </span>
                  ) : "Invoke Entity"}
                </button>
              </div>
            </div>
          )}
          
          {stage === "result" && character && (
            <div className="py-6">
              <h2 className="text-2xl font-bold text-[#5AC8FA] mb-6">
                Character Forge: Entity Manifested
              </h2>
              
              <div className="bg-[#131A36] border border-[#331F4A] rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                    <div className="aspect-square bg-[#331F4A] rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="text-6xl">
                        {characterTypes.find(t => t.id === characterType)?.icon || "✨"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-[#BF4080] mb-2">{character.name}</h3>
                    <div className="mb-4">
                      <span className="bg-[#331F4A] text-[#5AC8FA] text-sm px-2 py-1 rounded-md">
                        {character.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{character.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-[#5AC8FA] text-sm mb-1">Realms Traversed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {character.realms.map((realm, i) => (
                          <span key={i} className="bg-[#131A36] border border-[#331F4A] text-xs px-2 py-1 rounded">
                            {realm}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-[#5AC8FA] text-sm mb-1">Cosmic Marks:</h4>
                      <div className="flex flex-wrap gap-2">
                        {character.forces.map((force, i) => (
                          <span key={i} className="bg-[#131A36] border border-[#331F4A] text-xs px-2 py-1 rounded">
                            {force}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#331F4A] grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#5AC8FA] text-sm mb-2">Abilities:</h4>
                    <ul className="space-y-1">
                      {character.abilities.map((ability, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-[#BF4080] mr-2">•</span>
                          <span>{ability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-[#5AC8FA] text-sm mb-2">Challenges:</h4>
                    <ul className="space-y-1">
                      {character.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-[#BF4080] mr-2">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#131A36] border border-[#331F4A] rounded-xl p-6 mb-8">
                <h3 className="text-[#5AC8FA] font-bold mb-3">Power Activated: Character Forge</h3>
                <p className="mb-4">
                  You have successfully invoked an entity from the collective consciousness. This character is now available within your creative arsenal, ready to be deployed in narratives, games, and otherworldly encounters.
                </p>
                <div className="flex items-center">
                  <div className="mr-3 text-[#BF4080]">💪</div>
                  <div>
                    <span className="text-[#5AC8FA] font-medium">Character Forge</span>
                    <div className="text-sm text-gray-400">Power level increased to 1</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={reset}
                  className="px-6 py-3 bg-[#331F4A] hover:bg-[#6A3093] text-white rounded-lg transition-all shadow-lg hover:shadow-[0_0_15px_rgba(90,200,250,0.5)] border border-[#5AC8FA]"
                >
                  Create Another Character
                </button>
                <button 
                  onClick={() => window.location.href = "/command-center"}
                  className="px-6 py-3 bg-transparent hover:bg-[#131A36] text-[#5AC8FA] rounded-lg transition-all border border-[#5AC8FA]"
                >
                  Return to Command Center
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}