import React from "react";

const BurnFromInfo = () => {
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
          Show Info About Burning Tokens After Approving
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg"></h3>
            <div className="py-4 text-xl font-semibold">
              <p>
                In this step, the previously authorized user gains the ability
                to burn tokens. With this permission, they can permanently
                remove tokens from circulation.
              </p>
              <br />
              <p>
                Burning tokens decreases the total supply, which is often used
                to manage token value. This process creates scarcity,
                potentially increasing the value of the remaining tokens.
              </p>
              <br />
              <p>
                Once burned, these tokens cannot be recovered or used again.
                This irreversible action reinforces the limited supply of the
                tokens in circulation. Allowing authorized users to burn tokens
                can be a strategic tool for managing a tokens economy
                effectively.
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

export default BurnFromInfo;
