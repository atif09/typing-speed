#include <iostream>
#include <cstdlib>

int main(int argc, char* argv[]) {
    if (argc != 3) {
        std::cerr << "Usage: calculate_time <start_time> <end_time>\n";
        return 1;
    }
    long start = std::atol(argv[1]);
    long end = std::atol(argv[2]);
    std::cout << (end - start) << std::endl;
    return 0;
}