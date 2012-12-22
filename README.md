This project is a visualization of the Sieve of Eratosthenes algorithm for finding prime numbers.

This project uses Typescript.
To install typescript, run 'npm install -g typescript'

To build, run 'make'

Here is the pseudocode of the algorithm from wikipedia.org:

    for i = 2, 3, 4, ..., sqrt(n) :
        if A[i] is true:
            for j = i^2, i^2 + i, i^2 + 2i, ..., n:
                A[j] := false
    # Now all i such that A[i] is true are prime.

to view, open animation.html in a browser
