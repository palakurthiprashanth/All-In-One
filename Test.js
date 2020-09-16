<script>
    class Node {
        constructor(data) {
            this.data = data;
            this.nextElement = null;
        }
    };

    class LinkedList {
        constructor(){
            this.head = null;
        }
        isEmpty() {
            return this.head === null;
        }
        getHead() {
            return this.head;
        }
        insertAtHead(data) {
            let tempNode = new Node(data);
            tempNode.nextElement = this.head;
            this.head = tempNode;
            return this;
        }
        insertAtTail(data) {

            if (this.isEmpty()){
                this.head = new Node(data);
                return this;
            }

            let tempNode = new Node(data);
            let currentNode = this.head;
            while(currentNode.nextElement!==null) {
                currentNode = currentNode.nextElement;
            }
            currentNode.nextElement = tempNode;
            return this;
        }
        search(value) {
            if (this.isEmpty()){
                return;
            }
            let currentNode = this.head;
            while(currentNode!==null){
                if (currentNode.data === value){
                    return true;
                }
                currentNode = currentNode.nextElement;
            }
            return false;
        }
        deleteAtHead() {
            if (this.isEmpty()) {
                return;
            };
            let firstElement = this.head;
            this.head = firstElement.nextElement;
            return this;
        }
        deleteVal(value) {
            if (this.isEmpty()) {
                return null;
            }
            let currentNode = this.head;
            if (currentNode.data === value) {
                this.head = currentNode.nextElement;
                return this;
            }
            while(currentNode.nextElement!==null) {
                if (currentNode.nextElement.data ===value) {
                    currentNode.nextElement = currentNode.nextElement.nextElement;
                }
                currentNode = currentNode.nextElement;
            }
            return this;
        }
        deleteAtTail() {
            if (this.isEmpty()) {
                return this;
            };
            let currentNode = this.head;
            // If first element needs to be deleted;
            if (currentNode.nextElement === null) {
                this.deleteAtHead();
                return this;
            }
            while(currentNode.nextElement.nextElement!==null) {
                currentNode = currentNode.nextElement;
            }
            currentNode.nextElement = null;
            return this;
        }
        length(){
            if (this.isEmpty()){
                return 0;
            }
            let currentNode = this.head;
            let size =0;
            while(currentNode!==null) {
                size ++;
                currentNode = currentNode.nextElement;
            }
            return size;
        }
        reverse () {
            if (this.isEmpty()) {
                return;
            }
            let currentNode = this.head;
            let prev =null;
            while(currentNode!==null) {
                let next = currentNode;
                currentNode.nextElement = prev;
                prev = currentNode;
                currentNode = next;
            }
        }
        // Floyd Cycle Algo

        detectLoop() {
            if (this.isEmpty()){
                return null;
            }
            let oneStep = this.head;
            let twoStep = this.head;
            while(oneStep!==null &&  twoStep && twoStep.nextElement!==null) {
                oneStep = oneStep.nextElement;
                twoStep = twoStep.nextElement.nextElement;
                if (oneStep === twoStep) {
                    return true;
                }
            }
            return false;
        }
        // find length of cycle
        cycleLength() {
            // once two pointers meet , rotate one pointer till it reaches intial position
            if (this.isEmpty()) {
                return;
            }
            let slow = this.head;
            let fast = this.head;
            while (slow!==null && fast && fast.nextElement!==null) {
                slow = slow.nextElement;
                fast = fast.nextElement.nextElement;
                if (slow === fast) {
                    return calculateCycleLength(slow);
                }
            }
            return "no cycle";
        }

        calculateCycleLength(slow) {
            let current = slow;
            let length =0;

            while(current!==null) {
                current = current.nextElement;
                length= length+1;
                if (current === slow) {
                    break;
                }
            }
            return length;
        }

        // find starting poing of list
        startOfCycle () {
            let cycleLen = this.cycleLength();
            let pointer1 = this.head;
            let pointer2 = this.head;
            while(cycleLen > 0) {
                pointer2 = pointer2.nextElement;
                cycleLen-=1;
            }
            while (pointer1!==pointer2) {
                pointer1 = pointer1.nextElement;
                pointer2 = pointer2.nextElement;
            }
            return pointer1;
        }

        findMid () {
            if (this.isEmpty()) {
                return;
            }
            let slow = this.head;
            let fast = this.head;

            while (slow.nextElement!==null && fast && fast.nextElement.nextElement!==null) {
                slow = slow.nextElement;
                fast = fast.nextElement.nextElement;
            }
            return slow;
        }
        // Remove Duplicate = > HashMap;
        // Intersection of lists = > HashMap;

        nthNodeFromEnd(n){
            let nthNode = this.head;
            let endNode = this.head;
            let count =0;
            while(count <n) {
                if (endNode === null){
                    console.log("Out Of Bounds");
                    return;
                }
                endNode = endNode.nextElement;
                count++
            };
            while(endNode!==null) {
                endNode = endNode.nextElement;
                nthNode = nthNode.nextElement;
            }

            if (nthNode!==null) {
                return nthNode
            }else {
                return null;
            }
        }

    }

    function deleteAllOccurance(list,key) {
        let currentNode = list.getHead();
        if (currentNode.data === key) {
            list.head = currentNode.nextElement;
        }
        while(currentNode.nextElement!==null) {
            if (currentNode.nextElement.data === key) {
                currentNode.nextElement = currentNode.nextElement.nextElement;
            }
            currentNode = currentNode.nextElement;
        }
        return list.head;
    }
    //20, 14,36, 11, 72, 41
   /** let list = new LinkedList();
    list.insertAtHead(41);
    list.insertAtHead(72);
    list.insertAtHead(11);
    list.insertAtHead(36);
    list.insertAtHead(14);
    list.insertAtHead(20);
    list.insertAtHead(72);
    console.log(deleteAllOccurance(list,72));**/

    // sort List using Insertion Sort
    // sort List Using Merge Sort

    function swapNthNodeWithHead(list, n) {
        let head = list.getHead();
        let headNext = head.nextElement;
        let currentNode = head;

        while(currentNode.nextElement!==null) {
            if (currentNode.nextElement.data === n) {
                let tempNode = currentNode.nextElement.nextElement;
                let newHead = currentNode.nextElement;
                currentNode.nextElement = head;
                head.nextElement = tempNode;
                list.head = newHead;
                list.head.nextElement = headNext;
            }
            currentNode = currentNode.nextElement;
        }
        return list.head;
    }// 7, 14, 21, 28, 35, 42

  /**  let list = new LinkedList();
    list.insertAtHead(42);
    list.insertAtHead(35);
    list.insertAtHead(28);
    list.insertAtHead(21);
    list.insertAtHead(14);
    list.insertAtHead(7);
    console.log(swapNthNodeWithHead(list,42)); **/

    function mergeSortedLists(list1,list2) {
        let list1Head = list1.getHead();
        let list2Head = list2.getHead();

        let mergedList = new LinkedList();

        while(list1Head!==null && list2Head!==null) {
            if (list1Head.data <= list2Head.data) {
                mergedList.insertAtTail(list1Head.data);
                list1Head = list1Head.nextElement;
            }else {
                mergedList.insertAtTail(list2Head.data);
                list2Head = list2Head.nextElement;
            }
        }

        if (list1Head!==null) {
            mergedList.insertAtTail(list1Head);
        }
        if (list2Head!==null) {
            mergedList.insertAtTail(list2Head);
        }

        return mergedList;
    }
    //[4, 8, 15, 19, 22]
    // 7, 9, 10, 16

   /**  let list1 = new LinkedList();
    list1.insertAtHead(22);
    list1.insertAtHead(19);
    list1.insertAtHead(15);
    list1.insertAtHead(8);
    list1.insertAtHead(4);

    let list2 = new LinkedList();
    list2.insertAtHead(16);
    list2.insertAtHead(10);
    list2.insertAtHead(9);
    list2.insertAtHead(7);

    console.log(mergeSortedLists(list1,list2)); **/

//======================================================================================//

    // helper for reverse even
    // 7->14->21->28->9->null
    // 7->28->21->14->9->null

    function mergeAlternatingList(list1,list2){
        if (!list1) {
            return list2;
        }

        if (!list2) {
            return list1;
        }

        let currentNode = list1;

        while(list1.nextElement!==null && list2) {
            let temp = list2;
            let list1Next = list1.nextElement;
            let list2Next = list2.nextElement;
            list1.nextElement = temp;
            temp.nextElement = list1Next;
            list1 = list1Next;
            list2 = list2.nextElement;
        }

        return list1;
    }
   // Needs work
    function reverseEvenNodes(list) {
        let currentNode = list.getHead();
        let evenList = new LinkedList();

        while(currentNode!==null) {
            let even = currentNode.nextElement;
            currentNode.nextElement = even.nextElement;

            evenList.insertAtHead(even);
            currentNode = currentNode.nextElement;
        }

        mergeAlternatingList(currentNode,evenList);
    }

//==========================================================================================//

    function adjustRotationsNeeded(n,length) {
        n = n%length;
        if (n < 0) {
            n = n+length;
        }

        return n;
    };

    function rotateList(list,rotations) {
        let temp = list.getHead();
        let length = list.length();
        let n = adjustRotationsNeeded(rotations,length);
        let rotationsCount = length - n -1;
        let currentNode = list.getHead();

        while (rotationsCount > 0) {
            rotationsCount --;
            temp = temp.nextElement;
        }
        let newhead = temp.nextElement;
        temp.nextElement = null;
        temp = newhead;

        while(temp.nextElement!==null) {
            temp = temp.nextElement;
        }
        temp.nextElement = list.head;
        return newhead;
    }
  /**   let list = new LinkedList();
    list.insertAtHead(5);
    list.insertAtHead(4);
    list.insertAtHead(3);
    list.insertAtHead(2);
    list.insertAtHead(1);

    console.log(rotateList(list,2)); **/


   // reverse alternate k - nodes
    function reverseKnodes(list,k) {
        let head = list.getHead();

        let reversed =null;
        let previousTail = null;

        while (head && k >0) {
            let currentHead = null;
            let currentTail = head;

            let n =k;
            while (head && n >0) {
                let temp = head.nextElement;
                head.nextElement = currentHead;
                currentHead = head;
                head = temp;
                n--
            }

            if (!reversed) {
                reversed = currentHead;
            }

            if (previousTail) {
                previousTail.nextElement = currentHead;
            }
            previousTail = currentTail;
        }
        return reversed;
    }

  /** let list = new LinkedList();
    list.insertAtHead(7);
    list.insertAtHead(6);
    list.insertAtHead(5);
    list.insertAtHead(4);
    list.insertAtHead(3);
    list.insertAtHead(2);
    list.insertAtHead(1);

    console.log(reverseKnodes(list,3));**/
    

    function addIntegers(list1,list2) {
        let result = new LinkedList();

        let carry =0;

        while(list1 || list2 || carry >0) {
            let first = list1 ? list1.data : 0;
            let second = list2 ? list2.data : 0;

            let sum = first + second + carry;
            result.insertAtTail(sum%10);
            carry = Math.floor(sum/10);
            if (list1) {
                list1 = list1.nextElement;
            }
            if (list2) {
                list2 = list2.nextElement;
            }
        }
        return result;
    }
    //9, 9, 0, 1

   /**  let list1 = new LinkedList();
    list1.insertAtHead(9);
    list1.insertAtHead(9);
    list1.insertAtHead(0);
    list1.insertAtHead(1);

    // 7,3,2
    let list2 = new LinkedList();
    list2.insertAtHead(2);
    list2.insertAtHead(3);
    list2.insertAtHead(7);

    console.log(addIntegers(list1.head,list2.head));
    **/ 

    // copy LL with arbitary pointer. -- Hash Map


    // fast and slow pointers.

    // Happy number
    function calculateSquares(num) {
        let sum =0;
        while (num >0) {
            let digit = num%10;
            sum += digit*digit;
            num = Math.floor(num/10);
        }
        return sum;
    }
    function HappyNumber (number) {
        let slow = number;
        let fast = number;

        while (true) {
            slow = calculateSquares(number);
            fast = calculateSquares(calculateSquares(number));

            if (slow === fast) {
                break;
            }
        }
        return slow === 1;
    }

    // check palindrome , once after algo is done i/p should be unchanged -- To work

    // Re-arrange the list
    // Input: 2 -> 4 -> 6 -> 8 -> 10 -> 12 -> null
    // Output: 2 -> 12 -> 4 -> 10 -> 6 -> 8 -> null 

    function reOrder(list) {
        let slow = list.findMid();
        let fast = list.head;

        let secondHalf = slow.reverse();
        let firstHalf = list.head;

        while (firstHalf!== null && secondHalf!==null) {
            let temp = firstHalf.nextElement;
            firstHalf.nextElement = secondHalf;
            firstHalf = temp;

            temp = secondHalf.nextElement;
            secondHalf.nextElement = firstHalf;
            secondHalf = temp;
        }

        if (firstHalf) {
            firstHalf.nextElement = null;
        }
    }

    //  Reverse a sublist

    function reverse_sub_list(list , p, q) {
        let head = list.head;
        let current = head;
        let prev = null;
        let i=0;
        // ignore p-1;
        while (i < p-1) {
            prev = current;
            current = current.nextElement;
        }
        let lastElInFirstHalf = prev;
        let lastElAfterReverse = current;

        i =0;
       // revering subset
        while (i < q-p+1) {
            let temp = current.next;
            current.next = prev;
            prev = current;
            current = temp;
        }

        // Adding proper linkages
        lastElInFirstHalf.next = prev;
        lastElAfterReverse.next = current;

        return head;
    }

    // reverse every k-element sublist
    // 1->2->3->4->5->6->7->8->null to
    // 3->2->1->6->5->4->8->7->null

    function reverse_every_k_elements(list,k) {
        let head = list.head;
        if (k <1 || head === null) {
            return head;
        };

        let current = head;
        let prev = null;

        while(true) {
            let lastNodeOfprevPart = prev;
            let lastNodeOfSublist = current;
            
            let next =null;
            let i =0;

            while(current!==null && i < k) {
                next = current.nextElement;
                current.nextElement = prev;
                prev = current;
                current = next;
                i+=1;
            }

            if (last_node_of_previous_part !== null) {
                last_node_of_previous_part.nextElement = prev;
            }else {
                head = prev;
            }

            last_node_of_sub_list.nextElement = current;
            if (current === null) {
                break;
            }
            prev = last_node_of_sub_list;
        }
    }

    // reverse alternating k-element sublist

    function reverse_alternate_k_elements(list, k) {
        let head = list.head;
        if (k <1 || head===null) {
            return head;
        }

        let prev = null;
        let current = head;
        while(true) {
            let last_node_of_previous_part = prev;
            let last_node_of_sub_list = current;

            let i =0;
            while (i <k) {
                let next = current.nextElement;
                current.nextElement = prev;
                prev = current;
                current = nextElement;
            }
            if (last_node_of_previous_part !== null) {
                last_node_of_previous_part.next = previous;
            }else {
                head = prev;
            }
            last_node_of_sub_list.nextElement = current;
            // skip k nodes as we need to reverse alternating.
            i=0;
            while (i<k) {
                prev = current;
                current = current.nextElement;
                i+=1;
            }
            if (current === null) {
                break;
            }
        }
        return head;
    }
//----------------Two pointer ------------------------------
    // pair with target sum

    function pair_with_target_sum(arr,targetSum) {
        let sum =0;
        let left = 0;
        let right = arr.length -1;

        while(left <=right) {
            sum = arr[left]+arr[right];
            if (sum === targetSum) {
                return [arr[left],arr[right]];
            }
            if (sum < targetSum) {
                left = left+1;
            }else {
                right = right -1;
            }
        }
        return [-1,-1];
    }

    // remove duplicates -inplace and return lenght of non-duplicate array.

    function remove_duplicates(arr) {
        let nextNonDuplicate = 1;
        let i=1;

        while (i < arr.length) {
            if (arr[nextNonDuplicate -1] !==arr[i]) {
                arr[nextNonDuplicate] = arr[i];
                nextNonDuplicate+=1;
            }
            i+=1;
        }
        return nextNonDuplicate;
    }
   // console.log(remove_duplicates([2, 3, 3, 3, 6, 9, 9]));

   // Squaring a Sorted Array
   // sorted array can have -ve nos.

   function squareSortedArray(arr) {
       let n = arr.length;
       let squares = [];
       let left =0;
       let right = n-1;
       let highestSqIdx = n-1;

       while(left <=right) {
           let leftSq = arr[left]*arr[left];
           let rightSq = arr[right]*arr[right];

           if (leftSq > rightSq) {
               arr[highestSqIdx] = leftSq;
               left++;
           }else {
               arr[highestSqIdx] = rightSq;
               right--;
           }
           highestSqIdx-=1;
       }
       return squares;
   }

   // Triplet Sum to Zero
   // a+b+c =0 => a+b =-c
   // same as pair with targetSum , here target sum is -c;

   function searchpairs(arr,targetSum,index,triplets) {
       let left = index;
       let right = arr.length-1;

       while(left <right) {
           let sum = arr[left]+arr[right]
           if (sum === targetSum) {
               triplets.push([-targetSum,arr[left] ,arr[right]]);
               left ++;
               right --;
           }else if (sum <targetSum) {
               left++;
           }else {
               right--;
           }
       }
   }

    function search_triplets(arr) {
        arr.sort(function(a,b) {
            return a-b;
        });

        let triplets = [];

        for (var i=0;i< arr.length;i++) {
            searchpairs(arr, -arr[i],i+1,triplets);
        }
        return triplets;
    }

    // console.log(search_triplets([-5, 2, -1, -2, 3]));

    // Triplet sum close to target.

    function triplet_sum_close_to_target(arr,targetSum) {
        arr.sort(function(a,b) {
            return a-b;
        });
        let small = Number.POSITIVE_INFINITY;
        let closest = Number.POSITIVE_INFINITY;

        for (var i=0;i <arr.length-2;i++) {
            let left = i+1;
            let right = arr.length-1;

            while(left < right) {
                let tripletSum = arr[i]+arr[left]+arr[right];
                let targetDiff = targetSum - tripletSum;
                if (tripletSum === targetSum) {
                    return tripletSum;
                }
                if (Math.abs(targetDiff) < Math.abs(small)) {
                    small = targetDiff;
                    closest = tripletSum;
                }

                if (Math.abs(targetDiff) === Math.abs(small) &&  tripletSum < closest) {
                    closest = tripletSum;
                }

                if (tripletSum < targetSum) {
                    left++
                }else {
                    right--;
                }
            }
        }
        return closest;
    }
   /** console.log(triplet_sum_close_to_target([-2, 0, 1, 2], 2));
    console.log(triplet_sum_close_to_target([-3, -1, 1, 2], 1));
    console.log(triplet_sum_close_to_target([1, 0, 1, 1], 100)); **/

    // Triplet with sum less than target
    // Input: [-1, 0, 2, 3], target=3 
    //Output: 2
    //Explanation: There are two triplets whose sum is less than the target: [-1, 0, 3], [-1, 0, 2]

    function triplet_with_smaller_sum (arr, targetSum) {
        let count =0;
        for (var i=0;i<arr.length-2;i++) {
            let left= i+1;
            let right = arr.length-1;
            let tripletSum = arr[i]+arr[left]+arr[right];
            if (tripletSum < targetSum) {
                count += right-left; // everything before left also will be less;
                left++;
            }else{
                right--;
            }
        }
    }

    // Dutch national problem
    // 0's starting , 1's Mid, 2's last

    function dutch_flag_sort(arr) {
        let low =0;
        let high = arr.length-1;
        let i=0;

        while(i<=high) {
            if(arr[i]===0) {
                [arr[low],arr[i]] = [arr[i],arr[low]];
                low ++;
                i++;
            }else if (arr[i]===1) {
                i++;
            }else {
                [arr[high],arr[i]] = [arr[i],arr[high]];
                high--;
            }
        }
        return arr;
    }
   // let arr = [1, 0, 2, 1, 0];
   // console.log(dutch_flag_sort(arr));

   // Quadraplet sums

   function search_quadruplets (arr,target) {
       arr.sort(function(a,b) {
           return a-b;
       });
       let quadraplets =[];
       for (var i=0;i<arr.length-3;i++) {
           for (var j=i+1;j<arr.length-2;j++) {
               search_pairs(arr,target,i,j,quadraplets);
           }
       }
       return quadruplets;
   }
   function search_pairs(arr,target,first,second,quadraplets) {
       let left = second+1;
       let right = arr.length-1

       while (left < right) {
          let sum = arr[first]+arr[second]+arr[left]+arr[right];
          if (sum === target) {
              quadraplets.push(arr[first],arr[second],arr[left],arr[right]);
              left++;
              right--;
          }else if (sum < target) {
              left++;
          }else {
              right--;
          }
       }
   }

   // Comparing strings containing backspaces

   //  str1="xy#z", str2="xzz#" => true
   //  str1="xy#z", str2="xyz#" => false

   function backspace_compare (str1,str2) {
        let index1 = str.length-1;
        let index2 = str.length-2;

        while(index1 >=0 || index2 >=0) {
            let i1 = get_next_index(str1,index1);
            let i2 = get_next_index(str2,index2);

            if (str[i1]!== str[i2]) {
                return false;
            }
            index1 =i1-1;
            index2 = i2-1;
        }
        return true;
    };

    function get_next_index(str,index) {
        let backspaceCount =0;
        while(index >0) {
            if (str[index]==='#') {
                backspaceCount++;
            }else if (backspaceCount >0) {
                backspaceCount--;
            }else {
                break;
            }
            index --;
        }
        return index;
    }

 // shortest window sort

   function shortest_window_sort(arr) {
       let low = 0;
       let high = arr.length-1;

       while(low < arr.length && arr[low] <= arr[low+1]) {
           low++;
       }

       // Array is sorted.
       if (low === arr.length-1) {
           return 0;
       }

       while(high >0 && arr[high] > arr[high-1]){
           high--;
       }

       let subArrayMin = Number.POSITIVE_INFINITY;
       let subArrayMax = Number.NEGATIVE_INFINITY;

       for (var i =low;i<=high;i++) {
           subArrayMin = Math.min(subArrayMin,arr[i]);
           subArrayMax = Math.max(subArrayMax,arr[i]);
       }

       while(low >0 && arr[low-1] > subArrayMin) {
           low-=1;
       }

       while(high < arr.length && arr[high+1] < subArrayMax) {
           high+=1;
       }

       return high-low+1;
   }

</script>
