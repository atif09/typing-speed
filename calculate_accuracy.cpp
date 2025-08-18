#include <iostream>
#include <string>
#include <iomanip>

int main(int argc, char* argv[]) {
    if (argc != 3) {
        std::cerr << "Usage: calculate_accuracy <input> <quote>\n";
        return 1;
    }
    std::string input = argv[1];
    std::string quote = argv[2];
    int correct = 0;
    for (size_t i = 0; i < input.size() && i < quote.size(); ++i) {
        if (input[i] == quote[i]) correct++;
    }
    int accuracy = quote.size() > 0 ? static_cast<int>((double)correct / quote.size() * 100 + 0.5) : 100;
    std::cout << accuracy << std::endl;
    return 0;
}