
import './App.css';
import SelectPokemon from './components/SelectPokemon';

function App() {
  return (
    <div className="App">

      <div className='first-section'> 
      <SelectPokemon player="1"/>
      </div>
      
      <div className='second-section'>
      <SelectPokemon player="2"/>
       </div>
     
   
    </div>
    
  );
}

export default App;
