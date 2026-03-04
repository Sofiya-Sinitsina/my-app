README FILE FOR BUILDING A USER DLL FOR MATHCAD 7 PROFESSIONAL

Please read the Appendix in the Mathcad User's Guide on how to 
build user DLLs. In the following readme file we discuss issues, 
including compiler-specific ones, which are not addressed in the 
User's Guide. For purposes of this discussion we assume that you have 
installed Mathcad in the directory C:\WINMCAD. If this is not true (for
example, if you accepted the default Mathcad 7 Professional 
installation directory C:\PROGRAM FILES\MATHSOFT\MATHCAD), then
please substitute the correct path wherever C:\WINMCAD appears.

1. Loading of User DLLs

Every time you start Mathcad Profesional it loads by default any user 
DLLs that might exist in the USEREFI directory under Mathcad's 
home directory, e.g. C:\WINMCAD\USEREFI. So please remember that 
once you build a DLL, you have to place it in the USEREFI 
directory before you start Mathcad. Once you start Mathcad, to 
check if your DLL has been successfully loaded you can use the 
Function command on the Insert menu to see if your user-defined
function(s) is listed. If not, then either the DLL was not placed
in the USEREFI directory or there was a problem loading the functions.

2. Supported Compilers

To build a user DLL for Mathcad Professional, you need a compiler
capable of building Windows NT or compatible DLLs. We have tested the 
following compilers:

        *  Microsoft C/C++ compilers (Win32 SDK, Visual C++ [32s
           Version], Visual C++ for NT, Visual C++ for Windows 95)

        *  Borland C/C++ 4.0 and 4.5

        *  Symantec C/C++ 6.0 and 7.0

        *  Watcom C/C++ 9.5 and 10.0

Please note that later versions of these compilers *may not* 
be supported.

3. Writing Your DLL Source Code       

Under the subdirectory C:\WINMCAD\USEREFI you will find four 
subdirectories named MICROSFT, BORLAND, SYMANTEC, and 
WATCOM. In each directory there are three subdirectories, named 
INCLUDE, LIB, and, SOURCES. The WATCOM directory does not have 
a LIB subdirectory.

To build a user DLL you need to use the include file MCADINCL.H 
and, except for Watcom, you need to link with the import library 
MCADUSER.LIB. These two files are provided in the subdirectories 
INCLUDE and LIB, respectively, for each compiler.

The SOURCES subdirectory includes examples of source code for 
three different user DLLs. Each example is in its own directory. 
The examples are CMPLXSUM, SIMPLE, and USERPACK. SIMPLE for Microsoft 
is the one covered in the User's Guide. For each example there are also 
compiler-specific project or batch files included to be used to build 
the DLL. You may need to edit these if your Mathcad home directory 
path is not C:\WINMCAD.

The best approach to beginning a new user DLL for Mathcad is to start 
with one of the samples in the directory for your compiler and build it 
using the provided project files. Then you should modify the sample 
by adding your own functions. This involves defining the functions, 
creating error messages, registering the error messages and registering
the functions. If your code is in C++ you must declare your functions 
using the C language calling convention. You can do this by using 
extern "C" before your function declarations.

If you have trouble building the sample projects, then consult the 
README file in the directory for your compiler. If you have installed 
Mathcad in a directory other than C:\WINMCAD you may have to 
modify the project files. The main thing is to make sure the compiler 
search path for include files includes the INCLUDE subdirectory for 
your compiler under the USEREFI subdirectory. Also, except for 
Watcom, make sure the linker can find the import library file 
MCADUSER.LIB in the LIB subdirectory for your compiler. If after 
reading the readme file you still have trouble building the sample 
project or a modified version of it, then read the following general 
comments regarding compiler-specific issues.

4. General Comments for Compiling and Linking

        *  Make sure the compiler-specific include file MCADINCL.H 
           is in the compiler's include files search path.

        *  Use 4-byte or 8-byte alignment for the compiler.

        *  You need to link your DLL to the DLL called MCADUSER.DLL.  
           You can do this on demand as in the Watcom samples or by 
           generating an import library and linking with it as in   
           the samples for the other three compilers.  

        *  Each Mathcad user DLL needs to have a DLL initialization 
           function. This function, which is called a DLL entry point, 
           has to be specified to the linker. This is done differently  
           by different linkers. Some force you to call it a special 
           name like DllEntryPoint or LibMain; some allow you to 
           call it anything you want, but you must then declare the 
           name either in a linker directive or by a pragma directive. 

        *  If your DLL uses C runtime libraries you may have to 
           arrange for its initialization whenever the DLL entry
           point is called. Different compilers do this differently.

06/05/97
