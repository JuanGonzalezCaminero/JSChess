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

	if(ply != 0){
		children = getChildren(node);
		for(let i = 0; i < children.length; i++){
			if(player == MIN){
				heuristicValues.push(minimax(children[i], MAX, ply - 1, false));
			}else{
				heuristicValues.push(minimax(children[i], MIN, ply - 1, false));
			}
		}
		if(initialNode){
			console.log("Offered to initialNode:");
		}
		if(player == MIN){
			console.log("Offered to MIN node (level", ply, "): ", heuristicValues);
		}else{
			console.log("Offered to MAX: node (level", ply, "): ", heuristicValues);
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
				console.log("Chosen: ", min);
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
				//Search for all the nodes that share the same heuristic value,
				//if there are more than one, and return them
				for(let index = 0; index < heuristicValues.length; index++){
					if(heuristicValues[index] == max){
						options.push(children[index]);
					}
				}
				console.log("Chosen: ", max);
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
				console.log("Promoted: ", min);
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
				console.log("Promoted: ", max);
				return max;
			}
		}
	}else{
		return(heuristicValue(node));
	}
}
