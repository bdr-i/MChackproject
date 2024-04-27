import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:mchack/components/drawer.dart';
import 'package:mchack/components/task.dart';

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> {
  // controllers for the text fields
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _dueDateController = TextEditingController();
  final TextEditingController _pointsController = TextEditingController();
  final TextEditingController _userController = TextEditingController();

  //api call
  List<Map<String, dynamic>> tasks = [];

  Future<void> fetchTasks() async {
    var response = await http.get(
      Uri.parse('http://172.20.10.12:8000/api/task'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer apiKey',
      },
    );

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);
      setState(() {
        tasks = List<Map<String, dynamic>>.from(data);
        tasks.sort((a, b) => a['completed'].compareTo(b['completed']));
      
      });
    } else {
      print('Error: ${response.statusCode}');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: MyDrawer(),
        appBar: AppBar(
          title: const Text('Tasks'),
        ),
        body: RefreshIndicator(
          onRefresh: fetchTasks,
          child: Center(
            child: ListView.builder(
              itemCount: tasks.length,
              itemBuilder: (context, index) => Task(
          id: tasks[index]['idTask'] as int,
          name: tasks[index % tasks.length]['label'].toString(),
          description: tasks[index]['description'].toString(),
          dueDate: DateTime.parse(tasks[index]['due_date'])
              .toLocal()
              .toString()
              .split(' ')[0],
          // priority: tasks[index]['priority'].toString(),
          points: tasks[index]['reward'] as int,
          user: tasks[index]['user'].toString(),
          completed: tasks[index]['completed'] as int,
              ),
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            showDialog(
              context: context,
              builder: ((context) => (AlertDialog(
                    title: const Text("Add a Task"),
                    content: Column(mainAxisSize: MainAxisSize.min, children: [
                      TextField(
                        controller: _nameController,
                        decoration: const InputDecoration(
                          labelText: 'Name',
                        ),
                      ),
                      TextField(
                        controller: _descriptionController,
                        decoration: const InputDecoration(
                          labelText: 'Description',
                        ),
                      ),
                      TextField(
                        controller: _dueDateController,
                        decoration: const InputDecoration(
                          labelText: 'Due Date',
                        ),
                        onTap: () {
                          showDatePicker(
                            context: context,
                            initialDate: DateTime.now(),
                            firstDate: DateTime(2000),
                            lastDate: DateTime(2100),
                          ).then((selectedDate) {
                            if (selectedDate != null) {
                              _dueDateController.text = selectedDate.toString();
                            }
                          });
                        },
                      ),
                      TextField(
                        controller: _pointsController,
                        decoration: const InputDecoration(
                          labelText: 'Points',
                        ),
                        keyboardType: TextInputType.number,
                      ),
                      TextField(
                        controller: _userController,
                        decoration: const InputDecoration(
                          labelText: 'User',
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () async {
                          // Add your onPressed code here!
                          //api call
                          String name = _nameController.text;
                          String description = _descriptionController.text;
                          DateTime dueDate =
                              DateTime.parse(_dueDateController.text);
                          int points = int.parse(_pointsController.text);
                          String user = _userController.text;
                          // Create a new task object
                          var newTask = {
                            'label': name,
                            'description': description,
                            'due_date': dueDate.toString(),
                            'reward': points,
                            'user': user,
                            'completed': 0,
                          };

                          // Make the API call to send the new task data
                          // Replace 'apiEndpoint' with the actual API endpoint URL
                          // Replace 'apiKey' with the actual API key
                          var response = await http.post(
                            Uri.parse('http://172.20.10.12:8000/api/task'),
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer apiKey',
                            },
                            body: jsonEncode(newTask),
                          );

                          // Check the response status code
                          if (response.statusCode == 200) {
                            // Task added successfully
                            // Refresh the screen by updating the tasks list
                            setState(() {
                              tasks.add(newTask);
                            });
                          } else {
                            // Error occurred while adding the task
                            // Handle the error accordingly
                            print('Error: ${response.statusCode}');
                          }
                          //refresh the screen
                          setState(() {
                            // Get the values from the text fields
                          });
                        },
                        child: const Text('Add Task'),
                      ),
                    ]),
                  ))),
            );

            // Add your onPressed code here!
          },
          child: const Icon(Icons.add),
        ));
  }
}
