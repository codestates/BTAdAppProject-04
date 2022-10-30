pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract BlueChipToken is ERC20, Ownable {constructor() ERC20('BlueChipToken', 'BCT'){_mint(msg.sender, 1000000 * 10 ** 18);}}