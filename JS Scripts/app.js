// Initialize Web3
let web3;
let contract;
let contractAddress = '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB';  // Replace with your contract address
let contractABI = [
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "voter",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "candidateId",
                    "type": "uint256"
                }
            ],
            "name": "Voted",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "candidatesCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                }
            ],
            "name": "getCandidate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];  // Replace with your contract ABI

// Wait for the window to load to set up Web3
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });  // Request MetaMask accounts
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert('Please install MetaMask to use this app.');
    }
});

// Add a candidate
async function addCandidate() {
    const candidateName = document.getElementById('candidateName').value;
    const accounts = await web3.eth.getAccounts();
    
    if (candidateName === '') {
        alert('Please enter a candidate name');
        return;
    }

    try {
        await contract.methods.addCandidate(candidateName).send({ from: accounts[0] });
        alert('Candidate added successfully');
    } catch (error) {
        console.error(error);
        alert('Error adding candidate');
    }
}

// Vote for a candidate
async function vote() {
    const candidateId = document.getElementById('candidateId').value;
    const accounts = await web3.eth.getAccounts();

    if (candidateId === '') {
        alert('Please enter a candidate ID');
        return;
    }

    try {
        await contract.methods.vote(candidateId).send({ from: accounts[0] });
        alert('Vote cast successfully');
    } catch (error) {
        console.error(error);
        alert('Error casting vote');
    }
}

// Get candidate details
async function getCandidate() {
    const candidateId = document.getElementById('resultCandidateId').value;

    if (candidateId === '') {
        alert('Please enter a candidate ID');
        return;
    }

    try {
        const candidate = await contract.methods.getCandidate(candidateId).call();
        document.getElementById('candidateDetails').innerHTML = `
            ID: ${candidate[0]} <br>
            Name: ${candidate[1]} <br>
            Vote Count: ${candidate[2]}
        `;
    } catch (error) {
        console.error(error);
        alert('Error fetching candidate details');
    }
}
