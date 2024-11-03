import React from "react";

const Walkthrough = () => {
  return (
    <div className="my-8">
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Step 1</time>
            <div className="text-lg font-black">
              <a href="./tokenlaunch">Token Launch</a>
            </div>
            To launch a token, we start by deploying an ERC-20 contract. This
            contract requires the following fields: the token’s Name, Symbol,
            Supply, and metadata_URI. The Name identifies the token, and the
            Symbol provides a short ticker. The Supply sets the total token
            quantity, while the metadata_URI links to detailed token
            information. Once deployed, the token is ready for interactions on
            the blockchain.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end mb-10">
            <time className="font-mono italic">Step 2</time>
            <div className="text-lg font-black">
              <a href="./getcontractsbyuser">Get Token Contract Address</a>
            </div>
            To retrieve the ERC-20 contract address, we will use the users public
            key to identify any associated Token contracts. By querying the
            blockchain with the users address, we can locate any deployed
            ERC-20 contracts linked to that address.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Step 3</time>
            <div className="text-lg font-black">
              <a href="./mintnft">Token Transfer</a>
            </div>
            Next, we will transfer the newly launched tokens from our account to
            various other accounts. This step distributes the tokens, allowing
            others to hold and use them. Each transfer is recorded on the
            blockchain. Once transferred, recipients can interact with their
            tokens freely.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end mb-10">
            <time className="font-mono italic">Step 4</time>
            <div className="text-lg font-black">
              <a href="./approve">Burn Tokens</a>
            </div>
            In this step, we will burn some of the tokens we initially created.
            Burning tokens involves permanently removing them from circulation,
            reducing the total supply. This process is often used to control
            inflation or increase scarcity. Once burned, these tokens cannot be
            retrieved or used again.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Step 5</time>
            <div className="text-lg font-black">
              <a href="/approveallnfts">Allowance Approval</a>
            </div>
            In this step, we authorize all tokens within a specific smart
            contract for approval. This action grants the contract permission to
            manage or transfer tokens on our behalf as needed. Authorization is
            crucial for functions like automated transfers or staking. By
            setting approval, we enable efficient management of tokens within
            the contract. Once approved, the contract can act according to its
            programmed rules.
          </div>
          <hr />
        </li>

        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end mb-10">
            <time className="font-mono italic">Step 6</time>
            <div className="text-lg font-black">
              <a href="./transfertoken">Transfer From</a>
            </div>
            In this step, the previously authorized spender can now transfer
            tokens to any account of their choice. With the approval granted,
            they have the permission to manage and move the tokens as needed.
            This enables more flexible token usage, such as payments or
            redistributions. The spenders actions remain within the limits set
            by the original token owner.
          </div>
          <hr />
        </li>

        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Step 7</time>
            <div className="text-lg font-black">
              <a href="/approveallnfts">Burn From</a>
            </div>
            In this step, the previously authorized user gains the ability to
            burn tokens. With this permission, they can permanently remove
            tokens from circulation, decreasing the total supply. This process
            is typically used to manage token value by creating scarcity. Once
            burned, the tokens cannot be recovered or used again.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Walkthrough;
