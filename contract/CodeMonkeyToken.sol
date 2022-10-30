pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract CodeMonkeyToken is ERC20, Ownable {constructor() ERC20('CodeMonkeyToken', 'CMT'){_mint(msg.sender, 1000000 * 10 ** 18);}}