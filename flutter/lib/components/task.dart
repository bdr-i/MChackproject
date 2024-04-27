import 'package:flutter/material.dart';

class Task extends StatefulWidget {
  final String name;
  final String description;
  final DateTime dueDate;
  // final int priority;
  final int points;
  final String user;

  const Task({
    Key? key,
    required this.name,
    required this.description,
    required this.dueDate,
    // required this.priority,
    required this.points,
    required this.user,
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
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(widget.description),
                  ],
                ),
                Column(
                  children: <Widget>[
                    Text(
                        "${widget.dueDate.day}/${widget.dueDate.month}/${widget.dueDate.year}"),
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
