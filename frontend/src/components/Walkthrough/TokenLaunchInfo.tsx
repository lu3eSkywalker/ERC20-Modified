import React from "react";

const TokenLaunchInfo = () => {
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
          Show Info About Launching ERC20
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg"></h3>
            <div className="py-4 text-xl">
              <p>
                To launch a token, begin by deploying an ERC-20 contract with
                essential fields:{" "}
              </p>
              <br />
              <ul>
                <li>
                  <strong>Name:</strong> Identifies the token.{" "}
                </li>
                <li>
                  <strong>Symbol:</strong> Provides a short ticker for the token.
                </li>
                <li>
                  <strong>Supply: </strong>Sets the total token quantity.
                </li>
                <li>
                  <strong>metadata_URI:</strong> Links to detailed token information.
                </li>
              </ul>

              <br />
              <p></p>
              <br />
              <p>
                Once deployed, the ERC-20 contract allows interactions on the
                blockchain, enabling transfers and exchanges among users. This
                token can be integrated into decentralized applications,
                marketplaces, and wallets, functioning as a unique,
                blockchain-based asset.
              </p>
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

export default TokenLaunchInfo;
