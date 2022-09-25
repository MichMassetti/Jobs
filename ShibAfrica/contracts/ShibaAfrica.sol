//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

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


//MAINNET ROUTER: 0x10ED43C718714eb63d5aA57B78B54704E256024E
//MAINNET WBNB: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
//MAINNET TESTTOKEN: 0xe31013216Cdc0cf54A9dA564E69c213a30435f1D

//TESTNET ROUTER: 0xD99D1c33F9fC3444f8101754aBC46c52416550D1
//TESTNET FACTORY: 0x6725F303b657a9451d8BA641348b6761A6CC7a17
//TESTNET WBNB: 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd
contract ShibAfrica {
    address public WBNB = 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd;
    address public ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address public SHIBAFRICA = 0xe31013216Cdc0cf54A9dA564E69c213a30435f1D;
    address payable owner;
    address payable buyback;

    mapping(uint => uint) public Packages;
    mapping(address => uint) public levels;

    constructor(address _owner, address _buyback) {

        owner=payable(_owner);
        levels[owner]=10;
        buyback=payable(_buyback);

        Packages[0] = 50000000000000000;
        Packages[1] = 100000000000000000;
        Packages[2] = 250000000000000000;
        Packages[3] = 500000000000000000;
        Packages[4] = 1000000000000000000;
        Packages[5] = 2000000000000000000;
        Packages[6] = 5000000000000000000;
        Packages[7] = 10000000000000000000;
        Packages[8] = 20000000000000000000;
        Packages[9] = 40000000000000000000;

        levels[0x40568E2C3632C2C54ce7A76fE4A132c2D2785D2B]=9;
        levels[0xc18DccFB00bdd894DeB06Cce23586bb57978239b]=9;
        levels[0x74D2FFE54401F30538cfEBC524f64846F8BB037C]=9;
        levels[0x9A67cAc5FD39F9419aEc4dd0B6ACA690126B0f01]=9;
        levels[0xb8A676Fc48DA2Ea87cfB9d87A4310a14091dd101]=9;
        levels[0xCEd31b5df37e13065cE9A800eF85eCD48f80f57E]=9;
        levels[0x0915E78b173B1c5920eaB355E5A4B95faBA44F7E]=3;
        levels[0x7D708F78Bb312BADBB6a2D9b10e643b6a2276C6e]=9;
        levels[0x255669BE628EF19fDA45cDE6fF04Ba9FF237bAEe]=4;
        levels[0x15f896D6E8F1259e5df709737b92B3B257623634]=1;
        levels[0xF21D3d687AE470C8040ed2CCC812aD8865378Eb8]=3;
        levels[0x40E85181e20A9eEC5B150B5999EDBf81D3705023]=9;
        levels[0x3D4409a7Bad31F1d61be92B3E5c1C3be6BaF98fC]=9;
        levels[0x00BE4D72bD5Aa20c2023c0EEF2e9949F338b1F9b]=9;
        levels[0x1457A4a6293FF6889C64569990293bE9EDD5E72e]=9;
        levels[0xddD8E3c2bB73752F76e01f0663dF68F783bBE7C6]=9;
        levels[0x3e21e2Dc7d76b6CAb36c9F860423398311E9B19d]=9;
        levels[0xd805c66a13165CB31b6e6Eb01F19b5b64bF76F88]=9;
        levels[0xd805c66a13165CB31b6e6Eb01F19b5b64bF76F88]=9;
        levels[0x26E24bfBF08e3e6DEd77dADe76eCd95c150A626d]=9;
        levels[0x4c63067EF1faaBe2d5D335A06719f7a841f2FeAb]=3;
        levels[0x9cA635C21b833Bce4581c9dF15EbfEaCEBC45Bd0]=9;
        levels[0x4eC4c60ead071B3AC705c261D0bb8cAbb8C033E0]=9;
        levels[0x0709106AfF4cab1c5333741eBec887368F646537]=9;
        levels[0xA708Ba7f9F3fe47fFC5755a4D7160b0FEe8AD1f5]=3;
    }
    
    modifier onlyOwner() { require(msg.sender==owner,'OnlyOwner.');_; }
    modifier validPackage(uint package) { require(package>=1&&package<=9,'Invalid Package.');_; }
    //function setLevel(address user, uint level) onlyOwner validPackage(level) public { levels[user]=level; }
    
    //RICORDATI LE TASSE
    function buyPackage(address payable referral, uint package, uint amount)  
        public payable validPackage(package) returns(bool){
            if(package==levels[msg.sender]+1) levels[msg.sender]=package;
            address[] memory path;

            path = new address[](2);
            path[0]=WBNB;path[1]=SHIBAFRICA;

            uint referral_amount = 35*amount/100;//OK   //un utente può comprare più pacchetti ma solo consecutivamente
            uint token_amount = 30*amount/100;//crea una seconda funzione buyPackages che chiama tante volte buyPackage con tanti controlli
            uint owner_amount = 20*amount/100;//OK
            uint buyback_amount = 15*amount/100;//OK
            uint amountOutMin = 49*token_amount/100;

            if(levels[referral]>=package){
                referral.transfer(referral_amount);
            } else{
                buyback.transfer(referral_amount);
            }
            
            buyback.transfer(buyback_amount);
            owner.transfer(owner_amount);

            //BUY WITH PANCAKE SWAP

            IPancakeRouter02(ROUTER).swapExactETHForTokensSupportingFeeOnTransferTokens{value:token_amount}(amountOutMin, path, msg.sender, block.timestamp+300);

            return true;
    }
    function buyPackages(address payable referral, uint[] memory packages) public payable {
        require(referral!=address(0),'Referral is 0 address.');
        uint value = msg.value;
        require(packages[0]>=levels[msg.sender],'Invalid Level.');
        for(uint i; i < packages.length; i++){
            if(i!=packages.length-1){ require(packages[i]==packages[i+1]-1,'Not Consecutive.'); }
            value -= (Packages[i]);
            require(value>=0,'Invalid Payment.');
            //require(levels[msg.sender]>=packages[i]-1,'Buy Before Smallest Package.');

            require(buyPackage(referral, packages[i], Packages[packages[i]]),'Package not Buyed.');
        }
    }
}
