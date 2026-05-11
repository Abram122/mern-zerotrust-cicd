const Blocked = () => {
    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-12 rounded-xl shadow-xl w-full max-w-lg border border-red-100 text-center">
                <svg className="w-24 h-24 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">You are blocked</h2>
                <p className="text-xl text-gray-600">Contact the administrative support.</p>
            </div>
        </div>
    );
};

export default Blocked;
