/**
 * A generic cache implementation with LRU (Least Recently Used) eviction strategy
 * and optional time-based expiration.
 */
class Cache<K, V> {
    private cache: Map<K, { value: V; timestamp: number }>;
    private maxSize: number;
    private ttl: number; // Time to live in milliseconds

    /**
     * Create a new Cache instance
     * @param maxSize Maximum number of items to store in the cache
     * @param ttl Time to live for cache entries in milliseconds (optional)
     */
    constructor(maxSize: number = 100, ttl: number = Infinity) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;
    }

    /**
     * Set a value in the cache
     * @param key The key to store
     * @param value The value to store
     */
    set(key: K, value: V): void {
        // Remove expired entries
        this.cleanExpiredEntries();

        // If cache is full, remove the least recently used item
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        // Add new entry
        this.cache.set(key, { 
            value, 
            timestamp: Date.now() 
        });
    }

    /**
     * Get a value from the cache
     * @param key The key to retrieve
     * @returns The value if found and not expired, undefined otherwise
     */
    get(key: K): V | undefined {
        // Remove expired entries
        this.cleanExpiredEntries();

        const entry = this.cache.get(key);
        if (!entry) return undefined;

        // Update timestamp to mark as recently used
        entry.timestamp = Date.now();
        return entry.value;
    }

    /**
     * Delete a specific key from the cache
     * @param key The key to delete
     * @returns True if the key was found and deleted, false otherwise
     */
    delete(key: K): boolean {
        return this.cache.delete(key);
    }

    /**
     * Clear all entries from the cache
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Get the current size of the cache
     * @returns Number of items in the cache
     */
    size(): number {
        return this.cache.size;
    }

    /**
     * Remove expired entries from the cache
     */
    private cleanExpiredEntries(): void {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > this.ttl) {
                this.cache.delete(key);
            }
        }
    }
}

// Example usage of the cache
function demonstrateCacheUsage() {
    // Create a cache with max 3 items and 5-second TTL
    const cache = new Cache<string, number>(3, 5000);

    // Set some values
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    // Retrieve values
    console.log(cache.get('a')); // 1
    console.log(cache.get('b')); // 2

    // When adding a 4th item, the least recently used item will be removed
    cache.set('d', 4);
    console.log(cache.get('c')); // undefined (removed due to LRU)

    // Demonstrate time-based expiration
    cache.set('e', 5);
    // After 5 seconds, this entry will be automatically removed
}

// Original reverseArray function
function reverseArray<T>(arr: T[][]): T[][] {
    // Helper function to reverse a single dimensional array
    const reverseSubarray = <U>(subArr: U[]): U[] => {
        return subArr.reverse();
    };

    // Base case: if the input is not an array, return it as is
    if (!Array.isArray(arr)) {
        return arr;
    }

    // If the array is empty or contains only a single element, return it as is
    if (arr.length === 0 || arr.length === 1) {
        return arr;
    }

    // Reverse each sub-array and then reverse the order of the sub-arrays
    const reversedSubArrays = arr.map(subArr => reverseSubarray(subArr));
    return reversedSubArrays.reverse();
}

// Example usage of reverseArray:
const multiDimensionalArray: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const reversedArray = reverseArray(multiDimensionalArray);
console.log(reversedArray);
// Output: [[9, 8, 7], [6, 5, 4], [3, 2, 1]]

// Demonstrate cache usage
demonstrateCacheUsage();