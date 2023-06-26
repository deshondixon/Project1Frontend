import Bar from '/Users/deshondixon/projects/revature/project1frontend/src/components/Bar.js';
import Employee from './components/Employee';

export default function App() {
  return (
    <>
      <div>
        <Bar />
      </div>
      <div className='flex justify-center p-12'>
        {' '}
        <Employee />
      </div>
    </>
  );
}
