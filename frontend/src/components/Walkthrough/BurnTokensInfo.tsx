import React from 'react'

const BurnTokensInfo = () => {
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
              Show Info About Burning Tokens
            </button>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
                <h3 className="font-bold text-lg"></h3>
                <div className="py-4 text-xl font-semibold">
                  <p>
                    In this step, we’ll burn a portion of the tokens initially
                    created. Burning permanently removes tokens from circulation,
                    reducing the overall supply. This process helps control
                    inflation and can increase token scarcity.
                  </p>
                  <br />
                  <p>
                    Once burned, these tokens are removed from the blockchain and
                    cannot be retrieved or used again. Burning tokens is a common
                    practice to add value by limiting supply, ensuring the remaining
                    tokens retain or gain value over time.
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
}

export default BurnTokensInfo