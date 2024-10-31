import React from "react";

const TransferFromInfo = () => {
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
          Show Info About Transferring Tokens After Approval
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg"></h3>
            <div className="py-4 text-xl font-semibold">
              <p>
                In this step, the previously authorized spender can now transfer
                tokens to any account of their choice. With the approval
                granted, they have the necessary permission to manage and move
                the tokens as needed.
              </p>
              <br />
              <p>
                This capability enables more flexible token usage, including
                payments or redistributions. The spender can execute
                transactions efficiently, allowing for various use cases.
                However, their actions remain within the limits set by the
                original token owner. This ensures that the owner retains
                control over how many tokens can be spent or transferred.
                Overall, this process enhances the utility and flexibility of
                the tokens in circulation.
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

export default TransferFromInfo;
