//A generic implementation of the MINIMAX algorithm 
//for two-player games. A program using this must implement
//a method for calculating the heuristic value of the states
//and another to generate the states derivated from another


/*
Arguments:
	-node: Current node
	-player: MIN or MAX
	-ply: how many levels to explore in advance from this one
	-initialNode: Whether this is the first node of the exploration
Returns: 
	-The best option among the children of the given node, or an 
	array with equally valid options
*/
//const MIN = 0;
//const MAX = 1;

function minimax(node, player, ply, initialNode){
	let children = new Array(0);
	let heuristicValues = new Array(0);
	let options = new Array(0);

	if(player == MIN){
		nextPlayer = MAX;
	}else{
		nextPlayer = MIN;
	}

	if(ply != 0){
		children = getChildren(node);
		for(let i = 0; i < children.length; i++){
			heuristicValues.push(minimax(children[i], nextPlayer, ply - 1, false));
		}
		if(initialNode){
			//Get the index of the node with the Larger or Smaller value
			//depending on the current player
			if(player == MIN){
				//Get the index of the node with the Smaller heuristic value
				//Getting the Smaller value
				let min = heuristicValues.reduce(function(previousVal, currentVal, index, array) {
					//previousVal is the last returned value
					if(currentVal < previousVal){
						return currentVal;
					}else{
						return previousVal;
					}
				});
				//Search for all the nodes that share the same heuristic value,
				//if there are more than one, and return them
				for(let index = 0; index < heuristicValues.length; index++){
					if(heuristicValues[index] == min){
						options.push(children[index]);
					}
				}
				return options;
			}else{
				//Get the index of the node with the Larger heuristic value
				//Getting the Larger value
				let max = heuristicValues.reduce(function(previousVal, currentVal, index, array) {
					//previousVal is the last returned value
					if(currentVal > previousVal){
						return currentVal;
					}else{
						return previousVal;
					}
				});
				//If there are several nodes with the same value, only the first one
				//is returned
				//console.log("HValues: ", heuristicValues);
				//console.log("Max: ", max);
				//console.log("Index of max: ", heuristicValues.indexOf(max));
				//console.log("Chosen node: ", children[heuristicValues.indexOf(max)]);
				//console.log("Children: ", children.length, ", HValues: ", heuristicValues.length);

				//Search for all the nodes that share the same heuristic value,
				//if there are more than one, and return them
				for(let index = 0; index < heuristicValues.length; index++){
					if(heuristicValues[index] == max){
						options.push(children[index]);
					}
				}
				return options;
			}
		}else{
			//Get the index of the node with the Larger or Smaller value
			//depending on the current player
			if(player == MIN){
				//Get the index of the node with the Smaller heuristic value
				//Getting the Smaller value
				let min = heuristicValues.reduce(function(previousVal, currentVal, index, array) {
					//previousVal is the last returned value
					if(currentVal < previousVal){
						return currentVal;
					}else{
						return previousVal;
					}
				});
				return min;
			}else{
				//Get the index of the node with the Larger heuristic value
				//Getting the Larger value
				let max = heuristicValues.reduce(function(previousVal, currentVal, index, array) {
					//previousVal is the last returned value
					if(currentVal > previousVal){
						return currentVal;
					}else{
						return previousVal;
					}
				});
				return max;
			}
		}
	}else{
		return(heuristicValue(node));
	}
}
