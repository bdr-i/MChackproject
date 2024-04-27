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

  //api call
  var tasks = [
    {
      'name': 'Task 1',
      'description': 'Description 1',
      'dueDate': DateTime.now(),
      // 'priority': 1,
      'points': 10,
      'user': 'User 1',
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MyDrawer(),
        appBar: AppBar(
          title: const Text('Tasks'),
        ),
        body: Center(

            child: ListView.builder(
              
          itemCount: tasks.length,
          itemBuilder: (context, index) => Task(
            name: tasks[index % tasks.length]['name'].toString(),
            description: tasks[index]['description'].toString(),
            dueDate: tasks[index]['dueDate'] as DateTime,
            // priority: tasks[index]['priority'].toString(),
            points: tasks[index]['points'] as int,
            user: tasks[index]['user'].toString(),
          ),
        )),
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
                      ElevatedButton(
                        onPressed: () {
                          // Add your onPressed code here!
                          //api call
                          //refresh the screen
                          setState(() {
                            
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
