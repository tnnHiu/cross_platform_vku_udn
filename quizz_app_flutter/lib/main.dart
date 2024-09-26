import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final tickIcon = const Icon(
    Icons.check,
    color: Colors.green,
  );
  final crossIcon = const Icon(
    Icons.clear,
    color: Colors.red,
  );
  int count = 0;

  List<Icon> iconList = [];
  final List<Question> questionsList = [
    Question('Some cats are actually allergic to humans', true),
    Question('You can lead a cow down stairs but not up stairs.', false),
    Question('Approximately one quarter of human bones are in the feet.', true),
    Question('A slug\'s blood is green.', true),
    Question('Buzz Aldrin\'s mother\'s maiden name was "Moon".', true),
    Question('It is illegal to pee in the Ocean in Portugal.', true),
    Question(
        'No piece of square dry paper can be folded in half more than 7 times.',
        false),
    Question(
        'In London, UK, if you happen to die in the House of Parliament, you are technically entitled to a state funeral, because the building is considered too sacred a place.',
        true),
    Question(
        'The loudest sound produced by any animal is 188 decibels. That animal is the African Elephant.',
        false),
    Question(
        'The total surface area of two human lungs is approximately 70 square metres.',
        true),
    Question('Google was originally called "Backrub".', true),
    Question(
        'Chocolate affects a dog\'s heart and nervous system; a few ounces are enough to kill a small dog.',
        true),
    Question(
        'In West Virginia, USA, if you accidentally hit an animal with your car, you are free to take it home to eat.',
        true),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF333333),
      appBar: AppBar(
        title: const Text(
          "Quiz App",
          style: TextStyle(
            color: Colors.white,
          ),
        ),
        backgroundColor: const Color(0xFF333333),
      ),
      body: _body(),
    );
  }

  _checkAnswer(selectedAnswer) {
    if (selectedAnswer == questionsList[count].correctAnswer) {
      setState(() {
        iconList.add(tickIcon);
        if (count < questionsList.length - 1) count++;
      });
    } else {
      setState(() {
        iconList.add(crossIcon);
        if (count < questionsList.length - 1) count++;
      });
    }
  }

  Column _body() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Center(
          child: Padding(
            padding: const EdgeInsets.only(
              top: 110,
              left: 20,
              right: 20,
            ),
            child: Text(
              questionsList[count].question,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 25,
              ),
            ),
          ),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextButton(
              style: TextButton.styleFrom(
                backgroundColor: Colors.green,
              ),
              onPressed: () {
                _checkAnswer(true);
              },
              child: const Padding(
                padding: EdgeInsets.all(20),
                child: Text(
                  "True",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
            TextButton(
              style: TextButton.styleFrom(
                backgroundColor: Colors.red,
              ),
              child: const Padding(
                padding: EdgeInsets.all(20),
                child: Text(
                  "False",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
              ),
              onPressed: () {
                _checkAnswer(false);
              },
            ),
            Row(
              children: iconList,
            )
          ],
        ),
      ],
    );
  }
}

class Question {
  String question;
  bool correctAnswer;

  Question(this.question, this.correctAnswer);
}
