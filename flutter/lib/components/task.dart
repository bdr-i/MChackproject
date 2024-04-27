import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class Task extends StatefulWidget {
  final int? id;
  final String name;
  final String description;
  final String dueDate;
  // final int priority;
  final int points;
  final String user;
  final int? completed;

  const Task({
    Key? key,
    this.id,
    required this.name,
    required this.description,
    required this.dueDate,
    // required this.priority,
    required this.points,
    required this.user,
    this.completed,
  }) : super(key: key);

  @override
  State<Task> createState() => _TaskState();
}

class _TaskState extends State<Task> {
  @override
  Widget build(BuildContext context) {
    // bool isChecked = false;
    return Dismissible(
      key: UniqueKey(),
      onDismissed: (DismissDirection _direction) {
        // Determine the new completed value based on the swipe direction
        int newCompleted = _direction == DismissDirection.endToStart ? 1 : 0;

        // Make API call to update completed attribute
        // Replace `apiEndpoint` with your actual API endpoint
        String apiEndpoint = 'http://172.20.10.12:8000/api/task/${widget.id}';
        // Replace `apiKey` with your actual API key
        // String apiKey = 'YOUR_API_KEY';
        
        // Create the request body
        Map<String, dynamic> requestBody = {
          'label': widget.name,
          'description': widget.description,
          'due_date': widget.dueDate,
          'reward': widget.points,
          'user': widget.user,
          'completed': newCompleted,
        };

        // Make the API call
        http.put(
          Uri.parse(apiEndpoint),
          headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer apiKey',
          },
          body: jsonEncode(requestBody),
        ).then((response) {
          if (response.statusCode == 200) {
        // API call successful, handle the response
        // You can update the UI or perform any other actions here
          } else {
        // API call failed, handle the error
        // You can display an error message or perform any other actions here
          }
        }).catchError((error) {
          // Error occurred while making the API call, handle the error
          // You can display an error message or perform any other actions here
        });},
      
      child: Card(
          margin: const EdgeInsets.all(10),

          // Use the arguments to populate the card's content
          child: Padding(
            padding: const EdgeInsets.all(10),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  children: [
                    Text(
                      widget.name,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        decoration: widget.completed != 0 ? TextDecoration.lineThrough : null,
                      ),
                    ),
                    Text(widget.description),
                  ],
                ),
                Column(
                  children: <Widget>[
                    Text(widget.dueDate),
                    // Text(widget.priority.toString()),
                    Text("${widget.points} points"),
                    Text(widget.user),
                  ],
                ),
              ],
            ),
          )),
    );
  }
}
