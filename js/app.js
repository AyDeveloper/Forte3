/* Moralis init code */
const serverUrl = "https://dwix06avrgzo.usemoralis.com:2053/server";
const appId = "h4NMubLL4Tmadg1hqIPVGXKpgkxZVc590hYZs0BK";
Moralis.start({
  serverUrl,
  appId
});
let userAddress;
// add from here down
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "Welcome To Forte3"
    });
  }
  if (user) {
    userAddress = user.get('ethAddress');
    const loginBtn = document.querySelector('.loginBtn').innerText = userAddress;

  }
  console.log("logged in user:", user);
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  document.querySelector('.logoutBtn').classList.remove('disp');
  document.querySelector('.loginBtn').innerText = "Login";
}

//   document.querySelector('.loginBtn').addEventListener('click', e => {
//       console.log('clicked');
//       login();
//   })
document.querySelector('.logoutBtn').addEventListener('click', e => {
  console.log('clicked');
  logOut();
})

const loginHold = document.querySelector('.login');
loginHold.addEventListener('click', e => {
  if (e.target.classList == "loginBtn") {
    console.log("yes");
    login()
  }

  if (e.target.classList == "loginBtn" && e.target.innerText.startsWith("0x")) {
    console.log("yes", userAddress);
    const logout = document.querySelector('.logoutBtn');
    logout.classList.toggle('disp')
  }

  if (e.target.classList == "disp") {
    console.log("Logout, clicked");
  }


})


// send native coin;

const addrInput = document.querySelector("#address");
const amountInput = document.querySelector("#amount");
const sendBtn = document.querySelector("#sendBtn");

async function sendEth(amount, addr) {
  const options = {
    type: "native",
    amount: Moralis.Units.ETH(amount),
    receiver: addr
  };
  let result = await Moralis.transfer(options)
}
sendBtn.addEventListener("click", e => {
  if (amountInput.value && addrInput.value) {
    sendEth(amountInput.value, addrInput.value);

    addrInput.value = "";
    amountInput.value = "";
  }
})

// end of send native coin;


// send erc20 token
async function sendERC() {
  const addrInput2 = document.querySelector("#address2").value;
  const contractAddress = document.querySelector("#contractAddr").value;
  const decimal = document.querySelector("#decimal").value;
  const amountInput2 = document.querySelector("#amount2").value;

  const options = {
    type: "erc20",
    amount: Moralis.Units.Token(amountInput2, decimal),
    receiver: addrInput2,
    contractAddress: contractAddress
  }
  let result = await Moralis.transfer(options);
}

document.querySelector("#sendBtn2").onclick = sendERC;

// end of ERC Token


//Check your NFTs 
async function checkNft() {
  const addr = document.querySelector("#address3").value;
  const testnetNFTs = await Moralis.Web3API.account.getNFTs({
    chain: 'rinkeby',
    address: addr
  });
  const addOutcome = document.querySelector('.addOutcome');

  console.log(testnetNFTs);
  if (testnetNFTs.result.length <= 0) {
    addOutcome.innerHTML = `
        <div class="outCome">
        <p>You do not own an NFT</p>
        <p>Buy on these platforms <a href="https://opensea.io">Opensea</a>, <a href="https://rarible.com">Rarible</a> </p>
        </div>
      `
      setTimeout(() => {
        addOutcome.style.display = "none"
      }, 5000);
  } else {
    addOutcome.innerHTML = `
      <div class="outCome">
      <p>You are an NFT Holder</p>
      <p>The NFT ecosystem is in very early stages. Buy more at <a href="https://opensea.io">Opensea</a>, <a href="https://rarible.com">Rarible</a> </p>
      </div>
    `
    setTimeout(() => {
      addOutcome.style.display = "none"
    }, 5000);
  }
}

document.querySelector("#submitNft").onclick = checkNft;
//End of Check NFTs


//Check ENS
async function checkEns() {
  alert("It returns an .eth extension if true");
  const addressEns = document.querySelector("#addressEns").value;
  // get ENS domain of an address
  const options = {
    // address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
    address: addressEns
  };
  const resolve = await Moralis.Web3API.resolve.resolveAddress(options);
  const addOutcome1 = document.querySelector('.addOutcome1');

  console.log(resolve);
  console.log(resolve.name);


    if(resolve.name) {
      addOutcome1.innerHTML = `
          <div class="outCome">
          <p>${resolve.name}</p>
          <p>Buy more Ethereum Name Service at <a href="https://ens.domains/">ENS</a>, <a href="https://unstoppabledomains.com">Unstoppable Domains</a> </p>
          </div>
        `
        setTimeout(() => {
          addOutcome1.style.display = "none"
        }, 5000);
    }

   
}

document.querySelector("#EnsSubmit").onclick = checkEns;
//End of Check ENS;

// Custom Contract Address for PAM 
// 0x0403402d232f96FaeB67224C1eA68D715fFD8133
