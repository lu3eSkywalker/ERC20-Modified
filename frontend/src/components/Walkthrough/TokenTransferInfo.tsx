import React from "react";

const TokenTransferInfo = () => {
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
          Show Info About Transferring Tokens
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg"></h3>
            <div className="py-4 text-xl font-semibold">
              <p>
                Next, we’ll transfer the newly launched tokens from our account
                to various recipient accounts. This distribution allows others
                to hold and use the tokens.
              </p>
              <br />
              <p>
                Once the tokens are transferred, recipients can freely interact
                with their holdings, including trading, sending, or utilizing
                them in other compatible applications.
              </p>
              <br />
              <p>
                This step ensures the tokens are accessible to the intended
                users and marks the beginning of their circulation in the
                ecosystem.
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

export default TokenTransferInfo;
