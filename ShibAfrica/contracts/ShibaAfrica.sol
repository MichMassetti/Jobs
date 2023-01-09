//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
interface IPancakeRouter01 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        );

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path) external view returns (uint256[] memory amounts);
}
pragma solidity >=0.6.2;

interface IPancakeRouter02 is IPancakeRouter01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountETH);

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

//MAINNET WBNB: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
//MAINNET ROUTER: 0x10ED43C718714eb63d5aA57B78B54704E256024E
//MAINNET SHIBAFRICA: 0x4F509f8005b967AB8104290bBe79C49a5D2905f6

//TESTNET WBNB: 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd
//TESTNET ROUTER: 0xD99D1c33F9fC3444f8101754aBC46c52416550D1
//TESTNET FACTORY: 0x6725F303b657a9451d8BA641348b6761A6CC7a17
contract ShibAfrica {
    uint totalSupply;
    uint maxWallet;
    address public WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address public ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address public SHIBAFRICA = 0x4F509f8005b967AB8104290bBe79C49a5D2905f6;

    address payable public owner;
    address payable public buyback;

    address[] public Partecipants1;
    address[] public Partecipants2;
    address[] public Partecipants3;
    address[] public Partecipants4;
    address[] public Partecipants5;
    address[] public Partecipants6;
    address[] public Partecipants7;
    address[] public Partecipants8;
    address[] public Partecipants9;
    address[] public Partecipants10;
    address[] public Partecipants11;

    mapping(uint => uint) public Packages;

    mapping(address => uint) public rewards;

    mapping(address => uint) public levels;
    mapping(address => uint) public refCounter;
    mapping(address => uint) public totalTokenAmount;
    mapping(address => address) public myReferral;
    mapping(address => mapping(uint => uint)) public packagesTokenAmount;
    mapping(address => mapping(uint => uint)) public referralsReferralAmount;
    mapping(address => mapping(uint => uint)) public referralsLevels;
    mapping(address => mapping(uint => address)) public referralsAddress;

    event Buyed( uint packages, address referral );

    constructor(address _owner, address _buyback) {
        //DA TOGLIERE

        owner=payable(_owner);
        levels[owner]=10;
        buyback=payable(_buyback);

        Packages[1] = 25000000000000000;
        Packages[2] = 50000000000000000;
        Packages[3] = 100000000000000000;
        Packages[4] = 250000000000000000;
        Packages[5] = 500000000000000000;
        Packages[6] = 1000000000000000000;
        Packages[7] = 2000000000000000000;
        Packages[8] = 5000000000000000000;
        Packages[9] = 10000000000000000000;
        Packages[10] = 20000000000000000000;
        Packages[11] = 40000000000000000000;

        levels[0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E]=11;//claudio
        Partecipants11.push(0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E);
    
        levels[0xA4503936d174E3bcEb22309973600BF269037dea]=5;//marito
        Partecipants5.push(0xA4503936d174E3bcEb22309973600BF269037dea);
        totalTokenAmount[msg.sender] += (15*40000000000000000000/100);
        packagesTokenAmount[msg.sender][11] += (15*40000000000000000000/100);
        refCounter[0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E]++;
        referralsAddress[0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E][refCounter[0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E]]=msg.sender;
        referralsLevels[0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E][refCounter[0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E]]++;

        levels[0x64Aa1D36891363D52F72D418D4657ce44D57d11D]=4;//moglie
        Partecipants4.push(0x64Aa1D36891363D52F72D418D4657ce44D57d11D);
        totalTokenAmount[msg.sender] += (15*250000000000000000/100);
        packagesTokenAmount[msg.sender][4] += (15*250000000000000000/100);
        refCounter[0xA4503936d174E3bcEb22309973600BF269037dea]++;
        referralsAddress[0xA4503936d174E3bcEb22309973600BF269037dea][refCounter[0xA4503936d174E3bcEb22309973600BF269037dea]]=msg.sender;
        referralsLevels[0xA4503936d174E3bcEb22309973600BF269037dea][refCounter[0xA4503936d174E3bcEb22309973600BF269037dea]]++;

    }
    
    modifier onlyOwner() { require(msg.sender==owner||msg.sender==0x9A7f101ECf784dc44D0E0336244bC179b94E8634,'OnlyOwner');_; }//OK
    modifier validPackage(uint package) { require(package>=1&&package<=11,'Invalid Package.');_; }//OK
    function setLevel(address user, uint level) onlyOwner validPackage(level) public { levels[user]=level;setPartecipant(user, level); }//OK
    function setPartecipant(address partecipant, uint package) internal {
        if(package==1){ 
            Partecipants1.push(partecipant);
        } else if(package==2){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
        } else if(package==3){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
        } else if(package==4){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
        } else if(package==5){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
            Partecipants5.push(partecipant);
        } else if(package==6){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
            Partecipants5.push(partecipant);
            Partecipants6.push(partecipant);
        } else if(package==7){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
            Partecipants5.push(partecipant);
            Partecipants6.push(partecipant);
            Partecipants7.push(partecipant);
        } else if(package==8){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
            Partecipants5.push(partecipant);
            Partecipants6.push(partecipant);
            Partecipants7.push(partecipant);
            Partecipants8.push(partecipant);
        } else if(package==9){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
            Partecipants5.push(partecipant);
            Partecipants6.push(partecipant);
            Partecipants7.push(partecipant);
            Partecipants8.push(partecipant);
            Partecipants9.push(partecipant);
        } else if(package==10){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
            Partecipants5.push(partecipant);
            Partecipants6.push(partecipant);
            Partecipants7.push(partecipant);
            Partecipants8.push(partecipant);
            Partecipants9.push(partecipant);
            Partecipants10.push(partecipant);
        } else if(package==11){
            Partecipants1.push(partecipant);
            Partecipants2.push(partecipant);
            Partecipants3.push(partecipant);
            Partecipants4.push(partecipant);
            Partecipants5.push(partecipant);
            Partecipants6.push(partecipant);
            Partecipants7.push(partecipant);
            Partecipants8.push(partecipant);
            Partecipants9.push(partecipant);
            Partecipants10.push(partecipant);
            Partecipants11.push(partecipant);
        }
    }
    //RICORDATI LE TASSE
    function withdraw()
        public payable onlyOwner returns(bool){
            payable(msg.sender).transfer(address(this).balance);
            return true;
        }
    function buyPackages(address payable referral, uint package) public payable {
        require(levels[msg.sender]==package-1,'Invalid Level.');//OK
        if(levels[msg.sender]==0){
            myReferral[msg.sender]=referral;
        }
        levels[msg.sender]=package;
        require(myReferral[msg.sender]!=address(0),'Referral is 0 address.');//OK
        require(myReferral[msg.sender]!=msg.sender,"Referral can't be you.");//OK
        refCounter[myReferral[msg.sender]]++;

        address[] memory path;//OK
        path = new address[](2);//OK
        path[0]=WBNB;path[1]=SHIBAFRICA;//OK

        uint referralAmount = 20*msg.value/100;//OK   
        uint tokenAmount = 25*msg.value/100;//OK
        uint ownerAmount = 15*msg.value/100;//OK
        uint buybackAmount = 10*msg.value/100;//OK
        uint redistributedAmount = 30*msg.value/100;

        if(package==1){ 
            Partecipants1.push(msg.sender);
            uint redistributedPartecipants = redistributedAmount/Partecipants1.length;
            for(uint i=0;i<Partecipants1.length;i++){
                rewards[Partecipants1[i]] += redistributedPartecipants;
            }
        } else if(package==2){
            uint redistributedPartecipants = redistributedAmount/Partecipants2.length;
            Partecipants2.push(msg.sender);
            for(uint i=0;i<Partecipants2.length;i++){
                rewards[Partecipants2[i]] += redistributedPartecipants;
            }
        } else if(package==3){
            uint redistributedPartecipants = redistributedAmount/Partecipants3.length;
            Partecipants3.push(msg.sender);
            for(uint i=0;i<Partecipants3.length;i++){
                rewards[Partecipants3[i]] += redistributedPartecipants;
            }
        } else if(package==4){
            uint redistributedPartecipants = redistributedAmount/Partecipants4.length;
            Partecipants4.push(msg.sender);
            for(uint i=0;i<Partecipants4.length;i++){
                rewards[Partecipants4[i]] += redistributedPartecipants;
            }
        } else if(package==5){
            uint redistributedPartecipants = redistributedAmount/Partecipants5.length;
            Partecipants5.push(msg.sender);
            for(uint i=0;i<Partecipants5.length;i++){
                rewards[Partecipants5[i]] += redistributedPartecipants;
            }
        } else if(package==6){
            uint redistributedPartecipants = redistributedAmount/Partecipants6.length;
            Partecipants6.push(msg.sender);
            for(uint i=0;i<Partecipants6.length;i++){
                rewards[Partecipants6[i]] += redistributedPartecipants;
            }
        } else if(package==7){
            uint redistributedPartecipants = redistributedAmount/Partecipants7.length;
            Partecipants7.push(msg.sender);
            for(uint i=0;i<Partecipants7.length;i++){
                rewards[Partecipants7[i]] += redistributedPartecipants;
            }
        } else if(package==8){
            uint redistributedPartecipants = redistributedAmount/Partecipants8.length;
            Partecipants8.push(msg.sender);
            for(uint i=0;i<Partecipants8.length;i++){
                rewards[Partecipants8[i]] += redistributedPartecipants;
            }
        } else if(package==9){
            uint redistributedPartecipants = redistributedAmount/Partecipants9.length;
            Partecipants9.push(msg.sender);
            for(uint i=0;i<Partecipants9.length;i++){
                rewards[Partecipants9[i]] += redistributedPartecipants;
            }
        } else if(package==10){
            uint redistributedPartecipants = redistributedAmount/Partecipants10.length;
            Partecipants10.push(msg.sender);
            for(uint i=0;i<Partecipants10.length;i++){
                rewards[Partecipants10[i]] += redistributedPartecipants;
            }
        } else if(package==11){
            uint redistributedPartecipants = redistributedAmount/Partecipants11.length;

            Partecipants11.push(msg.sender);
            for(uint i=0;i<Partecipants11.length;i++){
                rewards[Partecipants11[i]] += redistributedPartecipants;
            }
        }
        uint amountOutMin = 0;//OK
        if(levels[myReferral[msg.sender]]>=package){
            IPancakeRouter02(ROUTER).swapExactETHForTokensSupportingFeeOnTransferTokens{value:referralAmount}(amountOutMin, path, myReferral[msg.sender], block.timestamp+300);//OK
            //payable(myReferral[msg.sender]).transfer(referralAmount);//OK
            referralsReferralAmount[myReferral[msg.sender]][refCounter[myReferral[msg.sender]]] += referralAmount;
        } else{
            buyback.transfer(referralAmount);//OK
            referralsReferralAmount[buyback][refCounter[buyback]] += referralAmount;
        }
        
        buyback.transfer(buybackAmount);//OK
        owner.transfer(ownerAmount);//OK

        //BUY WITH PANCAKE SWAP

        IPancakeRouter02(ROUTER).swapExactETHForTokensSupportingFeeOnTransferTokens{value:tokenAmount}(amountOutMin, path, msg.sender, block.timestamp+300);//OK
        //require(IERC20(SHIBAFRICA).balanceOf(msg.sender)<=maxWallet,'Max Token.');
        
        totalTokenAmount[msg.sender] += tokenAmount;
        packagesTokenAmount[msg.sender][package] += tokenAmount;

        referralsAddress[myReferral[msg.sender]][refCounter[myReferral[msg.sender]]]=msg.sender;
        referralsLevels[myReferral[msg.sender]][refCounter[myReferral[msg.sender]]]++;

        emit Buyed(package, myReferral[msg.sender]);
    }

    function claimRewards() public {
        require(rewards[msg.sender] > 0, "Nothing to claim");
        uint _value = rewards[msg.sender];        
        rewards[msg.sender] = 0;
        address[] memory path;//OK
        path = new address[](2);//OK
        path[0]=WBNB;path[1]=SHIBAFRICA;//OK
        uint amountOutMin = 0;//OK
        IPancakeRouter02(ROUTER).swapExactETHForTokensSupportingFeeOnTransferTokens{value:_value}(amountOutMin, path, msg.sender, block.timestamp+300);//OK
    }
}


