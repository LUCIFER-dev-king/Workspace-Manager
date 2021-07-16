function App() {
  return (
    <div className='bg-black h-screen'>
      <div class='h-12 bg-gradient-to-b from-white'></div>
      <div class='flex bg-white p-6 max-w-sm rounded-xl shadow-md items-center space-x-4'>
        <div class='flex-shrink-0'>
          <img class='h-12 w-12' src='/img/logo.svg' alt='ChitChat Logo' />
        </div>
        <div>
          <h4 class='text-xl font-medium text-black'>ChitChat</h4>
          <p class='text-grey-500'>You have a new message!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
