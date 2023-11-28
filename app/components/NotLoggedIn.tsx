import monkey from '~/public/monkey.gif';

export const NotLoggedIn = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full gap-5">
      <h1 className="font-bold text-xl">Not logged in :(</h1>
      <img src={monkey} alt="Dancing monkey" className="min-w-min max-w-2xl w-1/2" />
    </div>
  );
};
