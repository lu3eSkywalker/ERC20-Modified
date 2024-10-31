import React from "react";

const AllowanceApprovalInfo = () => {
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
          Show Info About Approving Tokens
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg"></h3>
            <div className="py-4 text-xl font-semibold">
              <p>
                In this step, we authorize all tokens within a specific smart
                contract for approval. This grants the contract permission to
                manage or transfer tokens on our behalf as needed.
              </p>
              <br />
              <p>
                Authorization is essential for tasks like automated transfers or
                staking, allowing the contract to handle tokens efficiently. By
                setting approval, we enable smooth token management within the
                contract. Once approved, the contract can execute actions based
                on its programmed rules, streamlining operations like staking or
                transfers without manual intervention.
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

export default AllowanceApprovalInfo;
