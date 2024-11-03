import React from "react";

const GetTokenCreatedByOwnerInfo = () => {
  const handleClick = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <div>
        <button
          className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClick}
        >
          Show Info About Getting Contract Address
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg"></h3>
            <div className="py-4 text-xl">
              <p>
                To retrieve an ERC-20 contract address, we will use the users
                public key as a search parameter to locate any associated token
                contracts. This search process will help us identify any ERC-20
                tokens associated with the address.
              </p>
              <br />
              <p className="font-bold">In summary: </p>
              <br />
              <ul>
                <li>
                  <strong>Step 1:</strong> Obtain the users public key.
                </li>
                <li>
                  <strong>Step 2:</strong> Query the blockchain, searching for
                  ERC-20 tokens tied to that address.
                </li>
                <li>
                  <strong>Step 3:</strong> Display the retrieved contract
                  address information.
                </li>
              </ul>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default GetTokenCreatedByOwnerInfo;
