// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface tokenRecipient {
    function receiveApproval(
        address _from,
        uint256 _value,
        address _token,
        bytes calldata _extraData
    ) external;
}

contract ERC20 {
    // Public variables of the token
    string public name;
    string public symbol;
    uint8 public decimals = 18; // 18 decimals is the strongly suggested default
    uint256 public totalSupply;

    // Metadata URI to store off-chain data
    string public metadataURI;

    // This creates an array with all balances
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Events for transfers and approvals
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Burn(address indexed from, uint256 value);
    event MetadataUpdated(string oldURI, string newURI); // Event for metadata changes

    /**
     * Constructor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol, string memory initialMetadataURI) {
        totalSupply = initialSupply * 10**uint256(decimals); // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply; // Give the creator all initial tokens
        name = tokenName;
        symbol = tokenSymbol;
        metadataURI = initialMetadataURI; // Set initial metadata URI
    }

    /**
     * Internal transfer, only can be called by this contract
     */
    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != address(0x0));
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        uint256 previousBalances = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    /**
     * Transfer tokens to another address
     */
    function transfer(address _to, uint256 _value) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * Transfer tokens from one address to another on behalf of the owner
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]); // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * Approve an address to spend tokens on behalf of the sender
     */
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * Approve and notify the contract via a callback function
     */
    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, address(this), _extraData);
            return true;
        }
    }

    /**
     * Burn a specific amount of tokens
     */
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value); 
        balanceOf[msg.sender] -= _value; 
        totalSupply -= _value; 
        emit Burn(msg.sender, _value);
        return true;
    }

    /**
     * Burn tokens from another account
     */
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value); 
        require(_value <= allowance[_from][msg.sender]); 
        balanceOf[_from] -= _value; 
        allowance[_from][msg.sender] -= _value; 
        totalSupply -= _value; 
        emit Burn(_from, _value);
        return true;
    }

    /**
     * Set a new metadata URI
     * 
     * This function allows the owner to update the metadata URI for the token.
     * @param newMetadataURI The new URI string where metadata can be accessed.
     */
    function setMetadataURI(string memory newMetadataURI) public returns (bool success) {
        string memory oldURI = metadataURI;
        metadataURI = newMetadataURI;
        emit MetadataUpdated(oldURI, newMetadataURI);
        return true;
    }

    /**
     * Get the token information including metadata URI
     */
    function getTokenInfo() public view returns (string memory, string memory, uint256) {
        return (name, symbol, totalSupply);
    }

    function getTokenMetadata() public view returns (string memory) {
        return (metadataURI);
    }
}